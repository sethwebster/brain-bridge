"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { type Socket } from "socket.io-client";
import globalSocket from "../../lib/socket";
import invariant from "tiny-invariant";

interface SocketContext {
  socket?: Socket | null;
}

export const SocketContext = createContext<SocketContext>({ socket: null });

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleConnected = useCallback(() => {
    console.log("SocketProvider: Socket is connected");
    setSocket(globalSocket);
  }, []);

  const handleDisconnected = useCallback(() => {
    console.log("SocketProvider: Socket is disconnected");
    setSocket(null);
  }, []);

  useEffect(() => {
    invariant(globalSocket, "SocketProvider: globalSocket is not defined");
    globalSocket.on("connect", handleConnected);
    globalSocket.on("disconnect", handleDisconnected);
    globalSocket.connect();
    return () => {
      globalSocket.off("connect", handleConnected);
      globalSocket.off("disconnect", handleDisconnected);
    };
  }, [handleConnected, handleDisconnected]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
