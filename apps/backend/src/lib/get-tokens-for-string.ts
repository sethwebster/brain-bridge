import { TiktokenModel, encoding_for_model } from "@dqbd/tiktoken";

const NATURAL_TOKEN_SEPARATORS = [" ", "\n", ";", ",", "!", "?"]

function naiveTokenizer(str: string) {
  let tokens = 0;
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    if (NATURAL_TOKEN_SEPARATORS.includes(char)) {
      tokens++;
    }
    i++;
  }
  return tokens;
}

export function getTokensForStringWithRetry(str: string, model: TiktokenModel = 'text-embedding-ada-002') {
  let tokens = 0;
  let retry = 0;
  while (retry < 3) {
    try {
      tokens = encoding_for_model(model).encode_ordinary(str).length;
      break;
    } catch (e) {
      retry++;
    }
  }
  if (str.length > 0 && tokens === 0) {
    console.log("TikTokEncoding Failed: Defaulting to local count");

    tokens = Math.floor(naiveTokenizer(str) * 1.1);
  }
  return tokens;
}
