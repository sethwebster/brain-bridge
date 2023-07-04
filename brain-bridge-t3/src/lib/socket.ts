import io from 'socket.io-client';
import invariant from 'tiny-invariant';
import defaultTokenManager from '~/hooks/AuthTokenManager';

invariant(process.env.NEXT_PUBLIC_SOCKETS_ENDPOINT, 'NEXT_PUBLIC_SOCKETS_ENDPOINT must be defined');

const socket = io(process.env.NEXT_PUBLIC_SOCKETS_ENDPOINT, {
  autoConnect: false,
  transports: ['websocket'],
});

if (defaultTokenManager.token) {
  socket.auth = {
    token: `Bearer ${defaultTokenManager.token}`
  }
}

defaultTokenManager.subscribeToAuthToken((token: string | null) => {
  console.log("globalSocket: token change: ", token)
  if (token) {
    socket.auth = {
      token: `Bearer ${token}`
    }
  }
})

export default socket;