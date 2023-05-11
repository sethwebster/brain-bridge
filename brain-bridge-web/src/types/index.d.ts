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

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

interface Chat {
  id: number;
  userId: string;
  name: string;
  participants: string[];
  messages: Message[];
}

type ChatStub = Pick<Chat, "id" | "name">;