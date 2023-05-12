const fakeData = {
  senders: [
    {
      id: "bot",
      name: "Seth Bot",
      avatar: "https://www.sethwebsterphotography.com/static/media/seth.1a4b4b5a.jpg",
    },
    {
      id: "sethwebster@gmail.com",
      name: "Student Guy",
    }
  ],
  chats: [
    {
      id: 1,
      userId: "sethwebster@gmail.com",
      name: "Chat 1",
      participants: ["bot", "sethwebster@gmail.com"],
      messages: [
        {
          id: 1,
          text: "Hello",
          sender: "bot",
          timestamp: "2021-01-01T00:00:00.000Z"
        },
        {
          id: 2,
          text: "Hi",
          sender: "sethwebster@gmail.com",
          timestamp: "2021-01-01T00:00:00.000Z",
        },
      ]
    }
  ]
}

const Data = {
  fetchChats: async (userId: string): Promise<ChatStub[]> => {
    const chats = fakeData.chats.filter(chat => chat.userId === userId).map(chat => (
      {
        id: chat.id,
        name: chat.name,
      }
    ));
    return chats;
  },
  fetchChat: async (id: number): Promise<Chat> => {
    const chat = fakeData.chats.find(chat => chat.id === id);
    return chat as Chat;
  },

  sendMessage: async (id: number, message: Message): Promise<Message> => {
    const url = process.env.NEXT_PUBLIC_CHAT_API_URL?.replace(":id", id.toString());
    console.log("Chat API Url", url)
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
    return {
      text: responseMessage.message,
      sender: "bot",
      timestamp: new Date().toISOString(),
      id: 0,
    }
  }
}
export default Data;