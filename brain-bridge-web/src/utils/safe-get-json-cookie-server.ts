import { getCookie, setCookie } from "cookies-next";

export function safeGetJSONCookieClient<T>(key: string, defaultValue: T) {
  try {
    return JSON.parse(getCookie(key) as string);
  } catch (e) {
    return defaultValue;
  }
}
