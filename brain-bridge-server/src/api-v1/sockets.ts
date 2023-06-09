import { Server, Socket } from "socket.io";
import { publicMessageHandler } from "./sockets/publicMessageHandler";
import { anyMessageHandler } from "./sockets/anyMessageHandler";
import { trainingHandler } from "./sockets/trainingHandler";
import { privateMessageHandler } from "./sockets/privateMessageHandler";
import { roomsHandler } from "./sockets/roomsHandler";

export function messageRouter(socket: Socket, io: Server) {
  anyMessageHandler(socket);
  roomsHandler(socket, io);
  publicMessageHandler(socket);
  trainingHandler(socket, io);
  privateMessageHandler(socket, io);
}
