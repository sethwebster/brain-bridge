import fs from "fs";
import path from "path";
import { env } from "@/env.mjs";

export function getTempFilePath(name: string, options: { mkdir?: boolean } = { mkdir: false }) {
  const tempFilePath = path.join(env.TEMP_FILE_PATH, name);
  if (options.mkdir) {
    fs.mkdirSync(tempFilePath, { recursive: true });
  }
  return tempFilePath;
}
