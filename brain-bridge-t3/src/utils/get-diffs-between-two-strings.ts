export default function getDiffsBetweenTwoStrings(
  oldString: string,
  newString: string
): { added: string[]; removed: string[]; } {
  const added: string[] = [];
  const removed: string[] = [];

  const oldWords = oldString.split(" ");
  const newWords = newString.split(" ");

  const oldWordsSet = new Set(oldWords);
  const newWordsSet = new Set(newWords);

  oldWords.forEach((word) => {
    if (!newWordsSet.has(word)) {
      removed.push(word);
    }
  });

  newWords.forEach((word) => {
    if (!oldWordsSet.has(word)) {
      added.push(word);
    }
  });

  return { added, removed };
}
