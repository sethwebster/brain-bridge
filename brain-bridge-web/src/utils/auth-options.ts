import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID || "<notset>",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "<notset>",
      issuer: process.env.AUTH0_ISSUER || "<notset>",
    })
  ],
};