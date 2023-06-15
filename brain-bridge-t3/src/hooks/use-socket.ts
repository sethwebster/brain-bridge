import { useCallback, useContext, useEffect, useState } from "react";

import { SocketContext } from "~/app/components/SocketProvider";
import invariant from "tiny-invariant";
import { type Socket } from "socket.io-client";
import socket from "~/lib/socket";
import { useAuthToken } from "./useAuthToken";

function logger<T>(message: string, data: T, sendOrReceived: "send" | "received") {
  console.log(`[${sendOrReceived}] Socket Message: `, message, data);
}

type JoinPayload = {
  room: string;
  type: "public" | "private";
} & (
    | { type: "public" }
    | { type: "private"; auth: string }
  )

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
      switch (payload.type) {
        case "public":
          this.socket.emit(`join-${payload.type}-room`, { data: { room: payload.room } });
          break;
        case "private":
          this.socket.emit(`join-${payload.type}-room`, { data: { room: payload.room }, token: payload.auth });
          break;
      }

      this.rooms.push(payload);
    }
  }

  leaveRoom(payload: JoinPayload) {
    if (!this.hasJoined(payload.room, payload.type)) {
      return;
    }
    switch (payload.type) {
      case "public":
        this.socket.emit(`leave-${payload.type}-room`, { data: { room: payload.room } });
        break;
      case "private":
        this.socket.emit(`leave-${payload.type}-room`, { data: { room: payload.room }, token: payload.auth });
        break;
    }
    this.rooms = this.rooms.filter((r) => r.room !== payload.room && r.type !== payload.type);
  }

  hasJoined(room: string, type: "public" | "private") {
    return this.rooms.find((r) => r.room === room && r.type === type);
  }
}


const roomManager = new RoomManager(socket);

export function useAuthenticatedSocket() {
  const { socket, sendMessage: sendMessageBase, onMessage, connected } = useSocket();
  const { token } = useAuthToken();

  const sendTheMessage = useCallback(<T>(message: string, data: T, token: string) => {
    invariant(socket, "Socket is not set");
    invariant(token, "Token is not set");
    sendMessageBase(message, { data, token });
  }, [sendMessageBase, socket]);

  const sendMessage = useCallback(<T>(message: string, data: T) => {
    invariant(token, "Token is not set");
    sendTheMessage(message, data, token);

  }, [sendTheMessage, token]);

  const leave = useCallback((room: string, type: "public" | "private") => {
    invariant(token, "Token is not set");
    roomManager.leaveRoom({
      room,
      type,
      auth: token
    });
  }, [token]);

  const join = useCallback((room: string, type: "public" | "private") => {
    if (!token) return () => { console.log("Token is not set") };
    invariant(token, "Token is not set");
    roomManager.joinRoom({ room, type, auth: token });
    return () => {
      invariant(token, "Token is not set");
      leave(room, type);
    }
  }, [leave, token]);

  return {
    connected,
    socket,
    sendMessage,
    onMessage,
    join,
    leave
  }
}

export default function useSocket() {
  const context = useContext(SocketContext);
  const { socket } = context;
  const [connected, setConnected] = useState(false);

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

  function join(room: string, type: "public") {
    roomManager.joinRoom({ room, type });
  }

  function leave(room: string, type: "public") {
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

  const handleConnected = useCallback(() => {
    console.log("-- Socket is connected")
    setConnected(true);
  }, []);

  const handleDisconnected = useCallback(() => {
    console.log("-- Socket is disconnected")
    setConnected(false);
  }, []);

  useEffect(() => {
    if (socket) {
      console.log("useSocket: Socket Set,", socket.connected ? "connected" : "disconnected")
      setConnected(socket.connected);
    }
  }, [handleConnected, handleDisconnected, socket]);

  return {
    connected,
    socket,
    sendMessage,
    onMessage,
    join,
    leave
  }

}
