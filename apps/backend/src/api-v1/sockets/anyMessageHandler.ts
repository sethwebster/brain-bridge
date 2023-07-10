import { Socket } from "socket.io";

export function anyMessageHandler(socket: Socket) {
  socket.onAny((event: any, ...args: any) => {
    // return;

    console.log("[catchall:received]", `'${event}'`, socket.listeners(event).length, "listeners");
  });
}
