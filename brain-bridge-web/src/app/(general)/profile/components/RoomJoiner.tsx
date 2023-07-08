"use client";
import React, { useEffect } from "react";
import useSocket from "~/hooks/use-socket";
import Logger from "~/lib/logger";

export type RoomType = "public" | "private" | "training";

interface RoomJoinerProps {
  room: string;
  type: RoomType;
}

function useChanged<T>(value: T) {
  const ref = React.useRef<T>();
  const changed = ref.current !== value;
  ref.current = value;
  return changed;
}

const RoomJoiner = React.memo(({ room, type = "private" }: RoomJoinerProps) => {
  const socket = useSocket();
  const socketChanged = useChanged(socket);
  console.log("---  RoomJoiner", { room, type, socketChanged, socket: socket.status })
  useEffect(() => {
    Logger.info("Running Room Joiner ");
    if (socket) {
      Logger.info("Socket is set, joining");
      socket.join(room, type);
      return () => {
        Logger.info("Running Room Joiner unmount");
        socket.leave(room, type);
      };
    }
  }, [room, socket, type]);
  return <></>;
});
RoomJoiner.displayName = "RoomJoiner";

export default React.memo(RoomJoiner);
