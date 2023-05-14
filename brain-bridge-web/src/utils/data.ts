import { User } from "next-auth";
import path from "path"

const makeApiUrl = (endpoint: string) => {
  const base = process.env.NEXT_PUBLIC_CHAT_API_URL
  const url = new URL(endpoint, base);
  return new URL(endpoint, base).toString();
}

const Data = {
  fetchChats: async (userId: string): Promise<ConversationStub[]> => {
    const chatsResponse = await fetch(makeApiUrl(`chats/${userId}`));
    if (chatsResponse.ok) {
      return await chatsResponse.json();
    }
    throw new Error("Failed to fetch chats");
  },
  fetchChat: async (id: string): Promise<Conversation> => {
    const chatResponse = await fetch(makeApiUrl(`chat/${id}`));
    if (chatResponse.ok) {
      return await chatResponse.json();
    }
    throw new Error("Failed to fetch chat " + chatResponse.statusText);
  },
  newChat: async (user: { email?: string | null | undefined; name?: string | null | undefined }) => {
    const url = makeApiUrl(`chat/`);
    const response = await fetch(url as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "corpus": "local",
        user
      }),
    })
    if (!response.ok) {
      throw new Error("Failed to create chat");
    }
    const responseMessage = await response.json();
    return responseMessage;
  },
  deleteChat: async (id: string, user: User) => {
    const url = makeApiUrl(`chats/${user.email}/${id}`);
    const response = await fetch(url as string, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Failed to delete chat");
    }
    return;
  },

  sendMessage: async (id: string, message: Message): Promise<Message> => {
    const url = makeApiUrl(`chat/${id}/message`);
    const response = await fetch(url as string, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message.text, sender: message.sender }),
    })
    if (!response.ok) {
      throw new Error("Failed to send message");
    }
    const responseMessage = await response.json();
    return responseMessage;
  },

  fetchTrainingSets: async (user: { email: string }): Promise<TrainingSet[]> => {
    const url = makeApiUrl(`training-sets/${user.email}`);
    const response = await fetch(url as string, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch training sets");
    }
    const responseMessage = await response.json();
    return responseMessage;
  },
  fetchTrainingSet: async (id: string, user: { email: string }): Promise<TrainingSet> => {
    const url = makeApiUrl(`training-sets/${user.email}/${id}`);
    const response = await fetch(url as string, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch training sets");
    }
    const responseMessage = await response.json()
    return responseMessage;
  },
  updateTrainingSet: async (id: string, user: { email: string }): Promise<TrainingSet> => {
    const url = makeApiUrl(`training-sets/${user.email}/${id}`);
    const response = await fetch(url as string, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch training sets");
    }
    const responseMessage = await response.json()
    return responseMessage;
  },
  deleteTrainingSet: async (id: string, user: { email: string }): Promise<void> => {
    const url = makeApiUrl(`training-sets/${user.email}/${id}`);
    const response = await fetch(url as string, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!response.ok) {
      throw new Error("Failed to fetch training sets");
    }
    const responseMessage = await response.json()
    return responseMessage;
  }


}
export default Data;