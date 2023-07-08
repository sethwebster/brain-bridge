import { cookies } from "next/headers";

export function safeGetJSONCookieServer<T>(key: string, defaultValue: T): T {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(cookies().get(key)?.value ?? "{}");
  } catch (e) {
    return defaultValue;
  }
}
