"use client";
import React, { useEffect } from "react";
import { useAuthToken } from "~/hooks/useAuthToken";
import useSocket from "~/hooks/use-socket";

export type RoomType = "public" | "private" | "training";

  
interface RoomJoinerProps {
  room: string;
  type: RoomType;
}

export const RoomJoiner = React.memo(({ room, type = "private" }: RoomJoinerProps) => {
  const socket = useSocket();
  const { token } = useAuthToken();
  useEffect(() => {
    if (socket) {
      if (token) socket.join(room, type);
      return () => {
        if (token) socket.leave(room, type);
      };
    }
  }, [room, socket, token, type]);
  return <></>;
});
RoomJoiner.displayName = "RoomJoiner";
