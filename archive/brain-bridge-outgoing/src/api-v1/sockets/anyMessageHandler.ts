export function anyMessageHandler(socket) {
  socket.onAny((event, ...args) => {
    return;
    console.log("[received]", event, ...args);
  });
}
