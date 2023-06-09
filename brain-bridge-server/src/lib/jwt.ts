import { type User } from "@prisma/client";
import * as jwt from 'njwt';

function createJwt(user: User, expiration?: number) {
  const claims = { sub: user.id, name: user.name, email: user.email } as jwt.JSONMap
  const token = jwt.create(claims, process.env.NEXTAUTH_SECRET as string);
  const ONE_MINUTE_MS = 1000 * 60;
  token.setExpiration(new Date().getTime() + (expiration || ONE_MINUTE_MS));
  return token.compact();
}

function verifyJWT(token: string) {
  // console.log("Verifying token", token)
  try {
    return jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
  } catch {
    return null;
  }
}

export { createJwt, verifyJWT };
