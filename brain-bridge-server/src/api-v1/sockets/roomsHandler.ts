import { PrismaClient, TrainingSet } from "@prisma/client";
import invariant from "tiny-invariant";
import { Server, Socket } from "socket.io";
import { GenericMessageHandler } from "./genericMessageHandler.ts";
import { ChatMessageHandler } from "./chatMessageHandler.ts";
import { MessageWithRelations, messageWithRelations } from "./types.ts";
import Mutex from "../../lib/mutex.ts";

export function getRoomId(id: string) {
  return `private-room-${id}`;
}
// io.use(
//   authorize({
//     secret: process.env.NEXTAUTH_SECRET,
//     onAuthentication: async (decodedToken) => {
//       console.log("THE TOKEN", decodedToken)
//     }
//   })
// )

let roomHandlers = new Map<string, GenericMessageHandler<{ message: MessageWithRelations }>[]>();
const mutex = new Mutex({ logging: false });
export function chatMessageRoomsHandler(socket: Socket, io: Server) {

  async function updateRoomHandler(fn: () => Promise<void>) {
    await mutex.run(fn);
  }

  socket.on("join-private-room", async ({ data: { room } }) => {

    updateRoomHandler(async () => {
      try {
        invariant(room, "room is required");
        const roomId = getRoomId(room)
        if (!roomHandlers.has(roomId)) {
          roomHandlers = roomHandlers.set(roomId, [new ChatMessageHandler(socket, io, roomId, [
            "message",
            "delete-message",
          ])]);
        } else {
          console.log("Adding handler...")
          roomHandlers.get(roomId)?.push(new ChatMessageHandler(socket, io, roomId, [
            "message",
            "delete-message",
          ]));
        }

        socket.join(roomId);
        socket.to(room).emit("user-joined", { room });
      } catch (error: any) {
        console.error(error)
      }
    });
  });

  socket.on("leave-private-room", async ({ data: { room }, token }) => {
    updateRoomHandler(async () => {
      try {
        console.log('leave-private-room', room)
        invariant(room, "room is required");
        const roomId = getRoomId(room)
        socket.leave(roomId);
        console.log('roomid', roomId)

        // Remove subscriptions for this handler / socket
        const handlerToDestroy = roomHandlers.get(roomId)?.find(handler => handler.socketId === socket.id);
        handlerToDestroy?.unsubscribe();
        const removed = roomHandlers.get(roomId)?.filter(handler => handler.socketId !== socket.id);
        roomHandlers = roomHandlers.set(roomId, removed || []);
        if ((await io.in(roomId).fetchSockets()).length === 0) {
          console.log("removing room", roomId)
          roomHandlers.delete(roomId);
        }
        socket.to(roomId).emit("user-left", { room });
      } catch (error: any) {
        console.error(error)
      }
    });
  });
}
