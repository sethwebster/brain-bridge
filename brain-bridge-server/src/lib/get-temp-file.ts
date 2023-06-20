import path from "path";
import invariant from "tiny-invariant";
import generateId from "./generate-id.ts";

export function getTempFilePath(name: string, options: { mkdir?: boolean } = { mkdir: false }) {
  invariant(process.env.TEMP_FILE_PATH!, "TEMP_FILE_PATH must be set");
  const unique = generateId(36);
  const tempFilePath = path.join(process.env.TEMP_FILE_PATH!, unique);
  return tempFilePath;
}
