"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { type Socket } from "socket.io-client";
import globalSocket from "../../lib/socket";
import invariant from "tiny-invariant";
import defaultTokenManager from "@/hooks/AuthTokenManager";
import Logger from "@/lib/logger";

type SocketStatus =
  | "none"
  | "connecting"
  | "connected"
  | "authenticated"
  | "error"
  | "disconnected";
interface SocketContext {
  socket?: Socket | null;
  token?: string | null;
  status: SocketStatus;
}

export const SocketContext = createContext<SocketContext>({
  socket: null,
  token: null,
  status: "none",
});

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [token, setToken] = useState<string | null>(defaultTokenManager.token);
  const [status, setStatus] = useState<SocketStatus>("none");
  const handleConnected = useCallback(() => {
    Logger.info("SocketProvider: Socket is connected");

    if (globalSocket.auth) {
      const { token } = globalSocket.auth as { token: string | null };
      if (token) {
        setSocket(globalSocket);
        setStatus("authenticated");
      } else {
        // setSocket(globalSocket);
        setStatus("connected");
      }
    }
  }, []);

  const handleDisconnected = useCallback(() => {
    Logger.info("SocketProvider: Socket is disconnected");
    setSocket(null);
    setStatus("disconnected");
  }, []);

  const handleTokenChange = useCallback((token: string | null) => {
    Logger.info("SocketProvider: Token Change", token);
    if (globalSocket) {
      if (!token) {
        globalSocket.auth = { token: null };
        return;
      } else {
        globalSocket.auth = { token: `Bearer ${token}` };
        globalSocket.connect();
      }
    }
    setToken(token);
  }, []);

  useEffect(() => {
    if (token !== defaultTokenManager.token) {
      handleTokenChange(defaultTokenManager.token);
    }
    if (token) {
      if (!globalSocket.connected) {
        setStatus("connecting");

        globalSocket.connect();
      } else {
        setStatus(token ? "authenticated" : "connected");
      }
    }
  }, [handleTokenChange, token]);

  useEffect(() => {
    invariant(globalSocket, "SocketProvider: globalSocket is not defined");
    const unsubscribe =
      defaultTokenManager.subscribeToAuthToken(handleTokenChange);
    globalSocket.on("connect", handleConnected);
    globalSocket.on("disconnect", handleDisconnected);

    return () => {
      unsubscribe();
      globalSocket.disconnect();
      globalSocket.off("connect", handleConnected);
      globalSocket.off("disconnect", handleDisconnected);
    };
  }, [handleConnected, handleDisconnected, handleTokenChange]);

  return (
    <SocketContext.Provider value={{ socket, token, status }}>
      {children}
    </SocketContext.Provider>
  );
}
