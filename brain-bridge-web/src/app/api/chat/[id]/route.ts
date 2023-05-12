import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

const fakeData = {
  senders: [
    {
      id: "1",
      name: "Seth Bot",
      avatar: "https://www.sethwebsterphotography.com/static/media/seth.1a4b4b5a.jpg",
    },
    {
      id: "2",
      name: "Student Guy",
    }
  ],
  chats: [
    {
      id: "1",
      name: "Chat 1",
      messages: [
        {
          id: "1",
          text: "Hello",
          sender: "1",
          timestamp: "2021-01-01T00:00:00.000Z"
        },
        {
          id: "2",
          text: "Hi",
          sender: "2",
          timestamp: "2021-01-01T00:00:00.000Z",
        },
      ]
    }
  ]
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const chat = fakeData.chats.find(chat => chat.id === id);
  if (!chat) {
    return NextResponse.json({
      error: "Chat not found",
    }, { status: 404 })
  }
  return NextResponse.json({ chat: chat, senders: fakeData.senders.filter(sender => chat.messages.find(message => message.sender === sender.id)) });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const chat = fakeData.chats.find(chat => chat.id === id);
  if (!chat) {
    return NextResponse.json({
      error: "Chat not found",
    }, { status: 404 })
  }
  const message = await request.json();
  message.id = chat.messages.length + 1;
  chat.messages.push(message);
  return NextResponse.json({ message });    
}