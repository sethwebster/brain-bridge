import { Server } from "socket.io";

export async function runWithIndicator<T>(io: Server, roomId: string, fn: () => Promise<T>) {
  try {
    setTimeout(() => io.in(roomId).emit('llm-response-started', { room: roomId }), 300);
    return await fn();
  } catch (err: any) {
    // console.log('runWithIndicator', err);
    throw err;
  } finally {
    try {
      io.in(roomId).emit('llm-response-ended', { room: roomId });
    } catch { }
  }
}
