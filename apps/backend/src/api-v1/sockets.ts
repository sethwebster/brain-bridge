import { Server, Socket } from "socket.io";
import { publicMessageHandler } from "./sockets/publicMessageHandler.ts";
import { anyMessageHandler } from "./sockets/anyMessageHandler.ts";
import { trainingHandler } from "./sockets/trainingHandler.ts";
import { promptGeneratorHandler } from "./sockets/promptGeneratorHandler.ts";
import { chatMessageRoomsHandler } from "./sockets/roomsHandler.ts";

export function messageRouter(socket: Socket, io: Server) {
  anyMessageHandler(socket);
  chatMessageRoomsHandler(socket, io);
  publicMessageHandler(socket);
  trainingHandler(socket, io);
  // privateMessageHandler(socket, io);
  promptGeneratorHandler(socket, io);
}
