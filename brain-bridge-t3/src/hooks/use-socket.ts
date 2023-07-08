import { useContext } from "react";

import { SocketContext } from "~/app/components/SocketProvider";
import invariant from "tiny-invariant";
import { type Socket } from "socket.io-client";
import socket from "~/lib/socket";
import Logger from "~/lib/logger";
import { type RoomType } from "~/app/(general)/profile/components/RoomJoiner";

function logger<T>(message: string, data: T, sendOrReceived: "send" | "received") {
  Logger.info(`[${sendOrReceived}] Socket Message: `, message, data);
}

type JoinPayload = {
  room: string;
  type: RoomType;
}

class RoomManager {
  rooms: JoinPayload[] = [];
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  joinRoom(payload: JoinPayload) {
    invariant(payload.room, "room is required");
    invariant(payload.type, "type is required");
    if (!this.hasJoined(payload.room, payload.type)) {
      this.socket.emit(`join-${payload.type}-room`, { data: { room: payload.room } });
      this.rooms.push(payload);
    }
  }

  leaveRoom(payload: JoinPayload) {
    if (!this.hasJoined(payload.room, payload.type)) {
      return;
    }

    this.socket.emit(`leave-${payload.type}-room`, { data: { room: payload.room } });

    this.rooms = this.rooms.filter((r) => r.room !== payload.room && r.type !== payload.type);
  }

  hasJoined(room: string, type: RoomType) {
    return this.rooms.find((r) => r.room === room && r.type === type);
  }
}

const roomManager = new RoomManager(socket);

export default function useSocket() {
  const context = useContext(SocketContext);
  const { socket, status } = context;
  function sendMessage<T extends object>(message: string, data: T) {
    logger(message, data, "send");
    if (
      Object.hasOwn(data, "data")
    ) {
      socket?.emit(message, data);
    } else {
      socket?.emit(message, { data });
    }
  }

  function join(room: string, type: RoomType) {
    roomManager.joinRoom({ room, type });
    return () => {
      roomManager.leaveRoom({ room, type });
    }
  }

  function leave(room: string, type: RoomType) {
    roomManager.leaveRoom({ room, type });
  }

  function onMessage<T>(message: string, callback: (data: T) => void) {
    const wrapper = (data: T) => {
      logger(message, data, "received");
      callback(data);
    }

    socket?.on(message, wrapper);
    return () => {
      if (!socket) return;
      socket.removeListener(message, wrapper);
    }
  }

  return {
    status,
    socket,
    sendMessage,
    onMessage,
    join,
    leave
  }

}
