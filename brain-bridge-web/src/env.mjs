import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NEXT_PUBLIC_LOG_LEVEL: z.enum(["none", "info", "debug", "warn", "error"]),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url(),
    ),
    API_ENDPOINT: z.string().url(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
    AUTH0_ISSUER: z.string().min(1),
    AUTH0_CLIENT_ID: z.string().min(1),
    AUTH0_CLIENT_SECRET: z.string().min(1),
    TEMP_FILE_PATH: z.string().min(1),
    ELEVENLABS_API_KEY: z.string().min(1),
    ELEVENLABS_VOICE_ID: z.string().min(1),
    NEXT_PUBLIC_R2_ACCOUNT_ID: z.string().min(1),
    R2_API_KEY: z.string().min(1),
    R2_API_SECRET: z.string().min(1),
    R2_USER_FILES_BUCKET: z.string().min(1),
    POSTMARK_API_KEY: z.string().min(1),
    NEXT_PUBLIC_SOCKETS_ENDPOINT: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH0_ISSUER: process.env.AUTH0_ISSUER,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    TEMP_FILE_PATH: process.env.TEMP_FILE_PATH,
    ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY,
    ELEVENLABS_VOICE_ID: process.env.ELEVENLABS_VOICE_ID,
    NEXT_PUBLIC_R2_ACCOUNT_ID: process.env.NEXT_PUBLIC_R2_ACCOUNT_ID,
    R2_API_KEY: process.env.R2_API_KEY,
    R2_API_SECRET: process.env.R2_API_SECRET,
    R2_USER_FILES_BUCKET: process.env.R2_USER_FILES_BUCKET,
    API_ENDPOINT: process.env.API_ENDPOINT,
    POSTMARK_API_KEY: process.env.POSTMARK_API_KEY,
    NEXT_PUBLIC_SOCKETS_ENDPOINT: process.env.NEXT_PUBLIC_SOCKETS_ENDPOINT,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
   * This is especially useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
