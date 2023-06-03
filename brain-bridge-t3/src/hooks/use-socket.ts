import { useEffect, useState } from "react";
import { socket } from "../lib/socket";

function logger<T>(message: string, data: T) {
  console.log("Socket Message: ", message, data);
}

export default function useSocket() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messageSubscriptions, setMessageSubscriptions] = useState<Record<string, (data: unknown) => void>>({});

  function sendMessage<T>(message: string, data: T) {
    console.log("Sending message: ", message, data)
    socket.emit(message, data);
  }

  function onMessage<T>(message: string, callback: (data: T) => void) {
    if (!messageSubscriptions[message]) {
      socket.on(message, (data: T) => {
        logger<T>(message, data);
        callback(data);
      });
      const newMessageSubscriptions = { ...messageSubscriptions };
      newMessageSubscriptions[message] = callback as (data: unknown) => void;
      setMessageSubscriptions(newMessageSubscriptions);
    }
  }

  function connect() {
    if (!isConnected) {
      socket.connect();
    }
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      for (const s in messageSubscriptions) {
        socket.off(s, messageSubscriptions[s]);
      }
    }
  }, [messageSubscriptions]);

  return {
    connect,
    isConnected,
    sendMessage,
    onMessage
  }

}
