import { PrismaClient, TrainingSet } from "@prisma/client";
import invariant from "tiny-invariant";
import { verifyJWT } from "../../lib/jwt";
import { Server, Socket } from "socket.io";
import Mutex from "../../lib/mutex";

export function getRoomId(id: string) {
  return `private-room-${id}`;
}

export function roomsHandler(socket: Socket, io: Server) {

  socket.on("join-private-room", async ({ data: { room }, token }) => {
    try {
      invariant(room, "room is required");
      const verifiedToken = verifyJWT(token);
      if (!verifiedToken) {
        socket.emit("rooms-error", { error: "Invalid token" });
        return;
      }
      console.log('joining room', getRoomId(room))
      socket.join(getRoomId(room));
      socket.to(room).emit("user-joined", { room });
    } catch (error: any) {
      console.error(error)
    }
  });

  socket.on("leave-private-room", async ({ data: { room }, token }) => {
    try {
      console.log('leave-private-room', room)
      invariant(room, "room is required");
      const verifiedToken = verifyJWT(token);
      if (!verifiedToken) {
        console.warn("Invalid token, leaving room anyway!");
      }
      console.log('leaving room', getRoomId(room))
      socket.leave(getRoomId(room));
      socket.to(getRoomId(room)).emit("user-left", { room });
    } catch (error: any) {
      console.error(error)
    }
  });
}
