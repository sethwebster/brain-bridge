import generateResponse from "../generate-response";
import { HNSWLib } from 'langchain/vectorstores';
import { getTrainingIndex } from "../training/training";
import redisClient from "../redis/client";
import { getUserTrainingSet, updateUserConversation } from "../user/user";
import invariant from "tiny-invariant";

class Conversation implements Conversation {
  id: string;
  name: string | null = null;
  messages: Message[];
  participants: Participant[];
  corpus: string;
  store: TrainingIndex | null = null;
  isReady: boolean = false;
  lastUpdate = new Date("1970-01-01")

  constructor(id: string, corpus: string) {
    console.log("Creating new conversation", id, corpus)
    this.id = id;
    this.corpus = corpus;
    this.messages = [];
    this.participants = [];
    this.loadStore();
  }

  private async loadStore() {
    console.log(`Loading index for conversation id ${this.id}, corpus ${this.corpus}`)
    this.store = await getTrainingIndex({ name: this.corpus, storageType: process.env.VECTOR_STORAGE as TrainingVectorStorageTypes })
    console.log(`Successfully loaded index store for conversation id ${this.id}, corpus ${this.corpus}`)
    this.isReady = true;
    this.updateLastUpdated();
  }

  private updateLastUpdated() {
    this.lastUpdate = new Date();
    redisClient.set(`conversations:${this.id}`, JSON.stringify(this));
  }

  join(participant: Participant) {
    this.participants.push(participant);
    this.updateLastUpdated();
  }

  leave(participant: Participant) {
    this.participants = this.participants.filter(p => p.id !== participant.id);
    this.updateLastUpdated();
  }

  /**
   * Adds a message to the conversation
   * @param message the message to add
   * @returns the newly added message
   */
  async add(message: string): Promise<Message> {
    const sender = this.participants.find(p => p.participantType !== "bot");
    this.messages.push(
      {
        id: this.length(),
        sender: sender?.name || sender?.email || "unknown",
        text: message,
        timestamp: new Date().toISOString()
      }
    );
    invariant(this.store, "Store not set")
    invariant(this.store?.store, "Store not loaded")
    const response = await generateResponse({
      basePrompt: this.store?.trainingSet.prompt,
      prompt: message,
      history: this.messages.map(m => `${m.sender}:${m.text}`),
      store: (this.store as TrainingIndex).store
    });
    const previousMessages = this.messages.filter(m => m.sender !== "bot");
    await this.addNameIfPossible(previousMessages);
    const newMessage = {
      id: this.length(),
      sender: this.participants.find(p => p.participantType === "bot")?.name || "unknown",
      text: response,
      timestamp: new Date().toISOString()
    };
    this.messages.push(
      newMessage
    );
    this.updateLastUpdated();
    return newMessage;
  }

  private async addNameIfPossible(previousMessages: Message[]) {
    invariant(this.store, "Store not loaded")
    if (previousMessages.length === 10 || (previousMessages.length > 10 && this.name === null)) {
      const user = this.participants.find(p => p.participantType !== "bot");
      invariant(user, "User not found");
      console.log("Generating Name...");
      const messages = this.messages.filter(m => m.sender === user?.name).map(m => `${m.sender}:${m.text}`).slice(0, 50);
      const name = await generateResponse({
        basePrompt: this.store.trainingSet.prompt,
        prompt: `What is a 1 line, 10-15 character TITLE of this conversation without quotes. 
          Leave out names and other identifying information.
          ignore pleaseantries, and anything without substance. ignore your own thoughts and focus on what the user said.
          Focus on the content of the conversation from the human that is outside the getting to know you parts, and instead on substance, if present.
        `,
        history: messages,
        store: this.store.store
      });
      this.name = name.replace('"', '').replace('"', '');
      await updateUserConversation(user, { id: this.id, name: this.name });
      console.log("Name Generated: ", name);
    }
  }

  length() {
    return this.messages.length;
  }

  static async fromRedis(id: string) {
    const response = await redisClient.get(`conversations:${id}`);
    if (response) {
      const conversation = Conversation.fromJSON(response);
      return conversation;
    } else {
      throw new Error("Conversation not found")
    }
  }
  static fromJSON(json: string) {
    const data = JSON.parse(json);
    const conversation = new Conversation(data.id, data.corpus);
    conversation.name = data.name;
    conversation.messages = data.messages;
    conversation.participants = data.participants;
    conversation.corpus = data.corpus;
    conversation.id = data.id;
    // conversation.loadStore();
    return conversation;
  }
}

export default Conversation;