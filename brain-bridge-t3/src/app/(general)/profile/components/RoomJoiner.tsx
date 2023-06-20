"use client";
import React, { useEffect } from "react";
import { useAuthToken } from "~/hooks/useAuthToken";
import useSocket from "~/hooks/use-socket";

export const RoomJoiner = React.memo(({ room }: { room: string; }) => {
  console.log("ROOMJOINER", room);
  const socket = useSocket();
  const { token } = useAuthToken();
  useEffect(() => {
    if (socket) {
      if (token) socket.join(room, "private");
      return () => {
        if (token) socket.leave(room, "private");
      };
    }
  }, [room, socket, token]);
  return <></>;
});
RoomJoiner.displayName = "RoomJoiner";
