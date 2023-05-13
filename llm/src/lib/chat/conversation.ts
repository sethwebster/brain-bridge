import generateResponse from "../generate-response";
import { HNSWLib } from 'langchain/vectorstores';
import { getTrainingIndex } from "../training/training";
import redisClient from "../redis/client";
import { updateUserConversation } from "../user/user";
import invariant from "tiny-invariant";

class Conversation implements Conversation {
  id: string;
  name: string | null = null;
  messages: Message[];
  participants: Participant[];
  corpus: string;
  store: HNSWLib | null = null;
  isReady: boolean = false;
  lastUpdate = new Date("1970-01-01")
  constructor(id: string, corpus: string) {
    this.id = id;
    this.corpus = corpus;
    this.messages = [];
    this.participants = [];
    this.loadStore();
    this.lastUpdate = new Date();
  }

  private async loadStore() {
    this.store = await getTrainingIndex({ name: this.corpus, storageType: process.env.VECTOR_STORAGE as TrainingVectorStorageTypes })
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
    const response = await generateResponse({
      prompt: message,
      history: this.messages.map(m => `${m.sender}:${m.text}`),
      store: (this.store as HNSWLib)
    });
    if (this.messages.filter(m => m.sender !== "bot").length === 10) {
      const user = this.participants.find(p => p.participantType !== "bot");
      invariant(user, "User not found")
      console.log("Generating Name...");
      const messages = this.messages.filter(m => m.sender === user?.name).map(m => `${m.sender}:${m.text}`).slice(0, 50);
      const name = await generateResponse({
        prompt: `What is a 1 line, 10-15 character TITLE of this conversation without quotes. 
          Leave out names and other identifying information.
          ignore pleaseantries, and anything without substance. ignore your own thoughts and focus on what the user said.
          Focus on the content of the conversation from the human that is outside the getting to know you parts, and instead on substance, if present.
        `,
        history: messages,
        store: (this.store as HNSWLib)
      });
      this.name = name.replace('"', '').replace('"', '');
      await updateUserConversation(user, { id: this.id, name: this.name })
      console.log("Name Generated: ", name);
    }
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
    conversation.loadStore();
    return conversation;
  }
}

export default Conversation;