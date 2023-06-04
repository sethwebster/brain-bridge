import io from 'socket.io-client';
import invariant from 'tiny-invariant';

invariant(process.env.NEXT_PUBLIC_SOCKETS_ENDPOINT, 'NEXT_PUBLIC_SOCKETS_ENDPOINT must be defined');
const socket = io(process.env.NEXT_PUBLIC_SOCKETS_ENDPOINT, {
  autoConnect: true,
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('connected outside hook');
});

socket.on('disconnect', () => {
  console.log('disconnected outside hook');
});

export default socket;