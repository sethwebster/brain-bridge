interface TrainingSession {
  prompt: string;
  name: string;
  questions: Question[];
}

interface Question {
  question: string;
  thoughts: string;
  autoGenerated: boolean;
}

interface TrainingSetShares {
  userId: string;
}

interface TrainingSet {
  id: string;
  userId: string;
  name: string;
  version: number;
  sources: TrainingSource[];
  dateCreated: Date;
  dateUpdated?: Date;
  prompt: string;
  questionsAndAnswers: QuestionAnswerToken[];
  shares: TrainingSetShares[];
}

type TrainingSetStub = Pick<TrainingSet, "id" | "userId" | "name" | "version" | "dateCreated" | "dateUpdated">;

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

interface QuestionAnswerToken {
  question: string;
  answer: string;
  token: string;
}
interface Chat {
  id: number;
  userId: string;
  name: string;
  participants: string[];
  messages: Message[];
}

type ConversationStub = Pick<Conversation, "id" | "name">;

interface TrainingSource {
  type: "file" | "url";
  location: string;
  content?: string;
  pending?: boolean;
}

type TrainingVectorStorageTypes = "local" | "redis";

interface Participant {
  id: string;
  name: string;
  email: string;
  participantType: 'user' | 'bot';
}

interface Conversation {
  id: string;
  name: string | null = null;
  messages: Message[];
  participants: Participant[];
  corpus: string;
  store: HNSWLib | null = null;
  isReady: boolean = false;
  lastUpdate: Date

  loadStore(): void;
  join(participant: Participant): void;
  leave(participant: Participant): void;

  async add(message: string): Promise<{ message: string, id: number }>;
  length(): number;
}

interface TrainingIndex {
  store: HNSWLib;
  corpus: string;
  trainingSet: TrainingSet;
  storageKeys: {
    metadata: string;
    vectors: string;
    documents: string;
  }
}

interface APIEnvelope<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface PublicChat {
  id: string;
  name: string;
  trainingSet: TrainingSetStub;
  trainingSetPath: string;
  published: boolean;
}

interface Viewer {
  id: string;
}
