"use client";
import React, {
  createContext,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import { type Socket } from "socket.io-client";
import globalSocket from "../../lib/socket";
import invariant from "tiny-invariant";
import defaultTokenManager from "~/hooks/AuthTokenManager";

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
    console.log("SocketProvider: Socket is connected");

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
    console.log("SocketProvider: Socket is disconnected");
    setSocket(null);
    setStatus("disconnected");
  }, []);

  const handleTokenChange = useCallback((token: string | null) => {
    console.log("SocketProvider: Token Change", token);
    if (globalSocket) {
      if (!token) {
        globalSocket.auth = { token: null };
        return;
      } else {
        console.log("Setting the socket token", token);
        // Token changed, but socket may be already connected
        // Disconnect and reconnect to update the token
        if (globalSocket.connected) {
          globalSocket?.disconnect();
          setStatus("disconnected");
        }
        globalSocket.auth = { token: `Bearer ${token}` };
        globalSocket.connect();
      }
    }
    setToken(token);
  }, []);

  useEffect(() => {
    invariant(globalSocket, "SocketProvider: globalSocket is not defined");
    const unsubscribe =
      defaultTokenManager.subscribeToAuthToken(handleTokenChange);
    globalSocket.on("connect", handleConnected);
    globalSocket.on("disconnect", handleDisconnected);
    setStatus("connecting");
    globalSocket.connect();
    return () => {
      unsubscribe();
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
