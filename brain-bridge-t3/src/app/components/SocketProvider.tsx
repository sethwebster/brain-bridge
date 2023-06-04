"use client";
import React, { createContext } from "react";
import { type Socket } from "socket.io-client";
import socket from "../../lib/socket";

interface SocketContext {
  socket?: Socket | null;
}

export const SocketContext = createContext<SocketContext>({ socket: null });

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
