import { getCookie } from "cookies-next";

export function safeGetJSONCookieClient<T>(key: string, defaultValue: T) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return JSON.parse(getCookie(key) as string);
  } catch (e) {
    return defaultValue;
  }
}
