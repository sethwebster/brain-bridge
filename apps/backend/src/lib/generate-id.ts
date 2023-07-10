export default function generateId(length = 16) {
  const id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  return id.substring(0, length);
}

export function generateUniqueClientId(): string {
  const prefix = 'cli';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const length = 22; // Total length of the ID minus the length of prefix

  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return prefix + result;
}
