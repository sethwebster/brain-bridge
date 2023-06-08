import io from 'socket.io-client';
import invariant from 'tiny-invariant';

invariant(process.env.NEXT_PUBLIC_SOCKETS_ENDPOINT, 'NEXT_PUBLIC_SOCKETS_ENDPOINT must be defined');
console.log("Creating socket...");
const socket = io(process.env.NEXT_PUBLIC_SOCKETS_ENDPOINT, {
  autoConnect: true,
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('connected: primary');
});

socket.on('disconnect', () => {
  console.log('disconnected: primary');
});

export default socket;