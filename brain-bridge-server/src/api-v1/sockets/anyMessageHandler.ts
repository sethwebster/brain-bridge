export function anyMessageHandler(socket) {
  socket.onAny((event, ...args) => {
    console.log("[received]", event, ...args);
  });
}
