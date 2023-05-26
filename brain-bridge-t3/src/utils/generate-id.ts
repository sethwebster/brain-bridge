export default function generateId(length = 16) {
  const id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  return id.substring(0, length);
}