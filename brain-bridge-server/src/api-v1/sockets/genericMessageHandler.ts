import { Server, Socket } from "socket.io";
import { ConversationWithRelations, MessageWithRelations, PublicChatInstanceWithRelations, messageWithRelations } from "./types.ts";
import invariant from "tiny-invariant";
import ServerData from "../../lib/server-data.ts";
import { prisma } from "../../lib/db.ts";
import { Participant, PublicChatInstance, User, UserSettings } from "@prisma/client";
import { Optional } from "langchain/dist/types/type-utils";

export type TokenUsageFn = (count: number) => void;
export type ChatResponseMode = "one-shot" | "critique" | "refine";
export abstract class GenericMessageHandler<O> {
  protected socket: Socket;
  protected io: Server;
  protected room: string;
  protected events: string[];
  protected _unsubscribe = () => { };

  constructor(socket: Socket, io: Server, room: string, events: string[]) {
    this.socket = socket;
    this.io = io;
    this.room = room;
    this.events = events;
    this._unsubscribe = this.subscribe();
  }

  get socketId() {
    return this.socket.id;
  }

  get unsubscribe() {
    return this._unsubscribe;
  }

  private subscribe() {

    const handlers = this.events.map(event => {
      const handler = (data: any) => this.handle(event, data)
      this.socket.on(event, handler);
      return () => {
        this.socket = this.socket.removeListener(event, handler)
      }
    })

    return () => {
      handlers.forEach(remover => {
        remover();
      });
    }
  }

  abstract getOptimisticResponse(message: MessageWithRelations): Promise<O> | O;

  async handle(event: string, { data: { mode, message } }: { data: { mode: ChatResponseMode, message: MessageWithRelations } }): Promise<void> {
    try {
      if (!this.handlesEvent(event)) return;
      const initialResponse = this.getOptimisticResponse(message);
      if (initialResponse) {
        // Optimistically send to room
        this.sendToRoom(initialResponse);
      }
      // Fetch the conversation
      const conversation = await this.fetchConversationForMessage(message);
      const type = message.conversationId ? 'conversation' : 'publicChatInstance';
      invariant(conversation, "Conversation must exist");
      switch (type) {
        case "conversation":
          const storedMessage = await this.storeMessage(conversation as ConversationWithRelations, message);
          const response = await this.generateResponse(conversation as ConversationWithRelations, storedMessage, mode);
          const newMessagePrivate = await this.storeMessage(conversation as ConversationWithRelations, response);
          this.sendToRoom({ message: newMessagePrivate });
          break;
        case "publicChatInstance":
          const storedPublicMessage = await this.storeMessage(conversation as PublicChatInstanceWithRelations, message);
          const publicResponse = await this.generateResponse(conversation as PublicChatInstanceWithRelations, storedPublicMessage, mode);
          const newMessagePublic = await this.storeMessage(conversation as PublicChatInstanceWithRelations, publicResponse);
          this.sendToRoom({ message: newMessagePublic });
          break;
      }
    } catch (e: any) {
      console.log('genericMessageHandler.ts: handle: error: ', e.message, 'event: ', event, 'data: ', { data: { mode, message } })
      switch (true) {
        case !!e.response && !!e.response.errors:
          const first = e.response.errors.at(0);
          if (first.message.includes("401 error")) {
            this.socket.emit(`${event}-error`, { error: "Invalid OpenAI Api Key" });
          } else if (first.message.includes('Cannot query field "Training_Set_')) {
            this.socket.emit(`${event}-error`, { error: "Training set has not yet been trained." });
          } else {
            this.socket.emit(`${event}-error`, { error: first.message });
          }
          break;
        case e.message:
          this.socket.emit(`${event}-error`, { "message": true, error: e.message });
          break;
        case typeof e === "object" && Object.keys(e).length === 0:
          const message = e.message ? e.message : e.toString();

          this.socket.emit(`${event}-error`, { error: message.replace("Error:", "").replace("Invariant failed:", "").trim() });
          break;
        default:
          console.log(Object.keys(e));
          console.log("DEFAULT", typeof e, e.toString(), "JSON", JSON.stringify(e, null, 2))
          this.socket.emit(`${event}-error`, { noMessage: true, error: e });

      }
    }
  }

  abstract generateResponse(conversation: ConversationWithRelations | PublicChatInstanceWithRelations, data: MessageWithRelations, chatResponseMode: ChatResponseMode): Promise<MessageWithRelations>;

  private handlesEvent(event: string): boolean {
    return this.events.includes(event);
  }

  private async fetchConversationForMessage(message: MessageWithRelations): Promise<ConversationWithRelations | PublicChatInstance | null> {
    const type = message.conversationId ? 'conversation' : 'publicChatInstance';
    switch (type) {
      case 'conversation':
        invariant(message.conversationId, "Conversation ID must exist")

        return await ServerData.fetchConversationWithRelations(message.conversationId);
      case 'publicChatInstance':
        invariant(message.publicChatInstanceId, "Conversation ID must exist")

        invariant(message.publicChatInstance?.id, "Public Chat Instance ID must exist")
        return await ServerData.fetchPublicChatInstanceWithRelations(message.publicChatInstance?.id);
    }
  }

  private async storeMessage(conversation: ConversationWithRelations | PublicChatInstanceWithRelations, payload: MessageWithRelations): Promise<MessageWithRelations> {
    // Ensure participant is set
    const type = payload.conversationId ? 'conversation' : 'publicChatInstance';
    let participant = type === "conversation" ? conversation?.participants.find(p => p.name === payload.sender.name) :
      payload.publicChatInstance?.participants.find(p => p.name === payload.sender.name);
    // console.log("genericMessageHandler.ts: storeMessage: type: ", type, "participant: ", participant, "payload: ", payload)

    participant = await this.createParticipantIfNecessary(participant, payload);

    let data: Record<string, any> = {};
    switch (type) {
      case 'conversation':
        data = {
          id: undefined,
          conversation: {
            connect: {
              id: conversation.id
            }
          },
          sender: {
            connect: {
              id: participant?.id
            }
          },
          text: payload.text,
        }
        break;
      case 'publicChatInstance':
        data = {
          id: undefined,
          publicChatInstance: {
            connect: {
              id: conversation.id,
            }
          },
          sender: {
            connect: {
              id: participant?.id
            }
          },
          text: payload.text,
        }
        break;
    }

    const message = await prisma.message.create({
      data: data as any,
      ...messageWithRelations
    });
    return message;
  }

  private async createParticipantIfNecessary(participant: Participant | null | undefined, payload: MessageWithRelations) {
    if (!participant) {
      const toCreate = { ...payload.sender } as Optional<typeof payload.sender, "id">;
      delete toCreate.id;
      participant = await prisma.participant.create({
        data: {
          ...payload.sender,
          id: undefined,
        }
      });
    }
    return participant;
  }

  private sendToRoom<O>(message: O) {
    this.io.in(this.room).emit("message", { ...message, room: this.room });
  }

}


export abstract class
  GenericMessageHandlerWithCosts<O> extends GenericMessageHandler<O> {
  async generateResponse(conversation: ConversationWithRelations | PublicChatInstance, data: MessageWithRelations, chatResponseMode: ChatResponseMode): Promise<MessageWithRelations> {
    const costs = {
      tokens: 0,
      stored: false,
    }

    const tokensUsedCallback: TokenUsageFn = (count) => {
      costs.tokens += count;
    }
    const response = await this.generateResponseWithCost(conversation, data, chatResponseMode, tokensUsedCallback);

    this.saveUsage(conversation, costs);

    return response;
  }

  abstract generateResponseWithCost(conversation: ConversationWithRelations | PublicChatInstance, data: MessageWithRelations, chatResponseMode: ChatResponseMode, tokensUsedCallback: TokenUsageFn): Promise<MessageWithRelations>;

  async getCurrentUser(): Promise<User & { userSettings: UserSettings[] } | null> {
    invariant(this.socket.decodedToken?.sub, "User ID must exist")
    return ServerData.fetchUserById(this.socket.decodedToken.sub);
  }

  async saveUsage(conversationOrPublicChatInstance: Pick<ConversationWithRelations, "id" | "trainingSet"> | Pick<PublicChatInstanceWithRelations, "id" | "publicChatId">, cost: { tokens: number; stored: boolean; }) {
    if ((conversationOrPublicChatInstance as PublicChatInstanceWithRelations).publicChatId) {
      const conversation = conversationOrPublicChatInstance as PublicChatInstanceWithRelations;
      const publicChat = await prisma.publicChat.findUnique({
        where: {
          id: conversation.publicChatId,
        },
      });
      invariant(publicChat, "Public Chat must exist")
      const result = await prisma.usage.create({
        data: {
          user: {
            connect: {
              id: publicChat?.userId,
            },
          },
          trainingSet: {
            connect: {
              id: publicChat.trainingSetId
            },
          },
          count: cost.tokens,
          type: "TOKEN",
          purpose: "GENERATE",
          updatedAt: new Date(),
          createdAt: new Date(),
          id: undefined,
          userId: undefined,
          trainingSetId: undefined,
        },
      }).catch(err => console.error(err)).then((usage) => {
        cost.stored = true;
        return usage;
      });
      return result;
    } else {
      const conversation = conversationOrPublicChatInstance as ConversationWithRelations;
      const result = await prisma.usage.create({
        data: {
          user: {
            connect: {
              id: conversation.trainingSet.userId,
            },
          },
          trainingSet: {
            connect: {
              id: conversation.trainingSet.id,
            },
          },
          count: cost.tokens,
          type: "TOKEN",
          purpose: "GENERATE",
          updatedAt: new Date(),
          createdAt: new Date(),
          id: undefined,
          userId: undefined,
          trainingSetId: undefined,
        },
      }).catch(err => console.error(err)).then((usage) => {
        cost.stored = true;
        return usage;
      });
      return result;
    }
  }
}
