import { Message } from "@prisma/client";
import { Socket } from "socket.io";
import { Prisma, type QuestionAndAnswer } from '@prisma/client';
import { publicMessageHandler } from "./sockets/publicMessageHandler";
import { anyMessageHandler } from "./sockets/anyMessageHandler";
import { trainingHandler } from "./sockets/trainingHandler";
import { privateMessageHandler } from "./sockets/privateMessageHandler";

export function messageRouter(socket: Socket) {
  anyMessageHandler(socket);
  publicMessageHandler(socket);
  trainingHandler(socket);
  privateMessageHandler(socket);

  socket.on("join-private-room", async ({ data: { room } }) => {
    try {
      console.log('joining room', room)
      socket.join(room);
      socket.to(room).emit("user-joined", { room });
    } catch (error: any) {
      console.error(error)
    }
  });

  socket.on("leave-private-room", async ({ data: { room } }) => {
    try {
      socket.leave(room);
      socket.to(room).emit("user-left", { room });
    } catch (error: any) {
      console.error(error)
    }
  });

}
