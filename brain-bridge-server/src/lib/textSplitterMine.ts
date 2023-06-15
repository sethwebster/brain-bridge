export function textSplitterMine(str: { source: string, content: string }, chunkSize: number, chunkOverlap: number, separator: string[] = [" ", ",", "\n"]) {
  console.log("Splitting a string of ", str.content.length, "Characters");
  console.log("Chunk size", chunkSize);
  console.log("Chunk overlap", chunkOverlap);

  let chunks: string[] = [str.content];
  const maxLen = (chunks: string[]) => {
    const lengths = chunks.map((c) => c.length);
    const maxLen = Math.max(...lengths);
    console.log("Max length", maxLen);
    return maxLen;
  };
  let lastChunkMaxLen = maxLen(chunks);
  let timesSeenSameMaxLen = 0;
  while (maxLen(chunks) > chunkSize) {
    if (lastChunkMaxLen === maxLen(chunks)) {
      timesSeenSameMaxLen++;
    }
    if (timesSeenSameMaxLen > 2) {
      console.log("Max length stuck. Breaking.");
      lastChunkMaxLen = 0;
      break;
    }
    const newStart: string[] = [];
    // Split into chunks of chunkSize
    for (const s of chunks) {
      if (s.length > chunkSize) {
        const approxMiddle = Math.floor(s.length / 2);
        let index = approxMiddle;
        while (!separator.includes(s[index]) && index < s.length) {
          index++;
        }
        const firstHalf = s.slice(0, index + chunkOverlap);
        const secondHalf = s.slice(index - chunkOverlap);
        newStart.push(firstHalf);
        newStart.push(secondHalf);
      } else {
        newStart.push(s);
      }
    }
    lastChunkMaxLen = maxLen(chunks);
    chunks = newStart;
  }
  const filtered = chunks.filter((c) => c && c.length > 0);
  console.log("Split into", filtered.length, "chunks", Array.isArray(filtered));
  return filtered.map((c) => ({ source: str.source, content: c }))
}
