import { type User } from '@prisma/client';
import * as jwt from 'njwt';

function createJwt(user: Partial<User>, expiration?: number) {
  const claims = { sub: user.id, name: user.name, email: user.email } as jwt.JSONMap
  const token = jwt.create(claims, process.env.NEXTAUTH_SECRET as string);
  const ONE_MINUTE_MS = 1000 * 60;
  const TEN_MINUTES = ONE_MINUTE_MS * 10;
  token.setExpiration(new Date().getTime() + (expiration || TEN_MINUTES));
  return token.compact();
}

function verifyJWT(token: string) {
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
  } catch {
    return null;
  }

}

export { createJwt, verifyJWT };