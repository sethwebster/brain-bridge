import { PrismaClient, TrainingSet } from "@prisma/client";
import invariant from "tiny-invariant";
import { Server, Socket } from "socket.io";
import { GenericMessageHandler } from "./genericMessageHandler.ts";
import { MessageWithRelations, messageWithRelations } from "./types.ts";
import Mutex from "../../lib/mutex.ts";
import { ChatMessageHandler } from "./chatMessageHandler.ts";

export function getRoomId(id: string) {
  return `private-room-${id}`;
}

let roomHandlers = new Map<string, GenericMessageHandler<{ message: MessageWithRelations }>[]>();
const mutex = new Mutex({ logging: false });
export function chatMessageRoomsHandler(socket: Socket, io: Server) {

  async function updateRoomHandler(fn: () => Promise<void>) {
    await mutex.run(fn);
  }

  async function handleJoin(room: string) {
    invariant(room, "room is required");
    const roomId = getRoomId(room)
    if (roomId.includes('training')) {
      console.error(
        "Training room detected. This handler is for chat rooms only."
      )
      return;
    }

    if (!roomHandlers.has(roomId)) {
      console.log("Creating handler...", roomId)
      roomHandlers = roomHandlers.set(roomId, [new ChatMessageHandler(socket, io, roomId, [
        "message",
        "delete-message",
      ])]);
    } else {
      console.log("Adding handler...", roomId)
      if (roomHandlers.get(roomId)?.find(handler => handler.socketId === socket.id)) {
        console.log("Already added handler...", roomId)
        return;
      }
      roomHandlers.get(roomId)?.push(new ChatMessageHandler(socket, io, roomId, [
        "message",
        "delete-message",
      ]));
    }
    console.log(roomHandlers.get(roomId)?.length, roomHandlers.get(roomId)?.map(handler => handler.socketId));
    console.log("Room handlers", roomHandlers.get(roomId)?.length)
    socket.on("disconnect", () => {
      console.log("*** DISCONNECTED ***")
      handleLeave(room);
    });
    socket.join(roomId);
    socket.to(room).emit("user-joined", { room });
  }

  async function handleLeave(room: string) {
    const roomId = getRoomId(room)
    console.log('leave-private-room', roomId)
    invariant(room, "room is required");
    socket.leave(roomId);

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
  }

  socket.on("join-private-room", async ({ data: { room } }) => {

    updateRoomHandler(async () => {
      try {
        handleJoin(room);
      } catch (error: any) {
        console.error(error)
      }
    });
  });

  socket.on("leave-private-room", async ({ data: { room } }) => {
    updateRoomHandler(async () => {
      try {
        handleLeave(room);
      } catch (error: any) {
        console.error(error)
      }
    });
  });
}
