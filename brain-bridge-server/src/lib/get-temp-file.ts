import fs from "fs";
import path from "path";
import invariant from "tiny-invariant";

export function getTempFilePath(name: string, options: { mkdir?: boolean } = { mkdir: false }) {
  invariant(process.env.TEMP_FILE_PATH!, "TEMP_FILE_PATH must be set");
  const tempFilePath = path.join(process.env.TEMP_FILE_PATH!, name).replaceAll(" ", "_");
  if (options.mkdir) {
    // make the directory if it doesn't exist
    const dir = path.dirname(tempFilePath);
    console.log("dir", dir)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
  return tempFilePath;
}
