import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession as getServerSessionBase,
  type NextAuthOptions,
  type DefaultSession,

} from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import Credentials from "next-auth/providers/credentials";
import invariant from "tiny-invariant";
// import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import generateId from "~/utils/generate-id";

invariant(process.env.AUTH0_ISSUER, "AUTH0_ISSUER must be set");

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}


/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: (args) => {
      const { session, token } = args;
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub
        }
      }
    },
  },
  session: {
    strategy: "jwt"
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "anonymous",
      credentials: {},
      async authorize() {
        return new Promise((resolve) => {
          resolve({
            id: generateId(), email: "anonymous", image: null, name: "anonymous"
          })
        })
      }
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || "<notset>",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "<notset>",
      issuer: process.env.AUTH0_ISSUER || "<notset>",
      authorization: {
        url: `https://${process.env.AUTH0_ISSUER}/authorize?response_type=code`,
        params: {
          prompt: "login",
        }

      }
    })
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSessionBase(ctx.req, ctx.res, authOptions);
};

export function getServerSession() {
  return getServerSessionBase(authOptions)
}