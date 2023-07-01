"use client";
import React, { useEffect } from "react";
import { useAuthToken } from "~/hooks/useAuthToken";
import useSocket from "~/hooks/use-socket";
import Logger from "~/lib/logger";

export type RoomType = "public" | "private" | "training";

interface RoomJoinerProps {
  room: string;
  type: RoomType;
}

const RoomJoiner = React.memo(({ room, type = "private" }: RoomJoinerProps) => {
  const socket = useSocket();
  const { token } = useAuthToken();
  useEffect(() => {
    Logger.info("Running Room Joiner ");
    if (socket) {
      Logger.info("Socket is set, joining");
      if (token) socket.join(room, type);
      return () => {
        Logger.info("Running Room Joiner unmount");
        if (token) socket.leave(room, type);
      };
    }
  }, [room, socket, token, type]);
  return <></>;
});
RoomJoiner.displayName = "RoomJoiner";

export default React.memo(RoomJoiner);
