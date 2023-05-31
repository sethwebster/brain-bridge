import fs from "fs";
import path from "path";
import invariant from "tiny-invariant";

export function getTempFilePath(name: string, options: { mkdir?: boolean } = { mkdir: false }) {
  invariant(process.env.TEMP_FILE_PATH!, "TEMP_FILE_PATH must be set");
  const tempFilePath = path.join(process.env.TEMP_FILE_PATH!, name);
  if (options.mkdir) {
    fs.mkdirSync(tempFilePath, { recursive: true });
  }
  return tempFilePath;
}
