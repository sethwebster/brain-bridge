import { useCallback, useContext, useEffect, useState } from "react";
import { type User } from "next-auth";
import ms from 'ms';

import DataClient from "~/utils/data-client";
import { SocketContext } from "~/app/components/SocketProvider";
import invariant from "tiny-invariant";

function logger<T>(message: string, data: T, sendOrReceived: "send" | "received") {
  console.log(`[${sendOrReceived}] Socket Message: `, message, data);
}

export function useAuthenticatedSocket() {
  const { socket, sendMessage: sendMessageBase, onMessage } = useSocket();
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(Date.now() - ms("1m"));

  async function getToken() {
    const result = await DataClient.getToken();
    setToken(result.token);
    setTokenExpiration(Date.now() + ms("1m"));
    return result.token;
  }

  useEffect(() => {
    if (Date.now() > (tokenExpiration ?? 0)) {
      getToken().catch(console.error);
    }
  }, [tokenExpiration]);

  function sendTheMessage<T>(message: string, data: T, token: string) {
    invariant(socket, "Socket is not connected");
    invariant(token, "Token is not set");
    sendMessageBase(message, { data, token });
  }

  function sendMessage<T>(message: string, data: T) {
    const tokenExpired = Date.now() > (tokenExpiration ?? 0);
    if (tokenExpired || !token) {
      getToken().then((token) => {
        sendTheMessage(message, data, token);
      }).catch(console.error);
    } else {
      sendTheMessage(message, data, token);
    }
  }

  return {
    socket,
    sendMessage,
    onMessage
  }
}

export default function useSocket() {
  const context = useContext(SocketContext);
  const { socket } = context;

  function sendMessage<T>(message: string, data: T) {
    logger(message, data, "send");
    socket?.emit(message, data);
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
    socket,
    sendMessage,
    onMessage
  }

}
