import { cookies } from "next/headers";

export function safeGetJSONCookieServer<T>(key: string, defaultValue: T) {
  try {
    return JSON.parse(cookies().get(key)?.value ?? "{}");
  } catch (e) {
    return defaultValue;
  }
}
