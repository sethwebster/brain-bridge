import { QuestionAndAnswerPartial } from "../api-v1/sockets/types";


const replaceTokens = (textWithTokens: string, tokensWithAnswers: QuestionAndAnswerPartial[]) => {
  return tokensWithAnswers.reduce((acc, curr) => {
    if (curr.answer.trim().length === 0) return acc;
    if (curr.token.startsWith("{csv:")) {
      const csv = curr.answer
        .split(",")
        .map((x: string, index: number) => `${index + 1}. ${x.trim()}`)
        .join("\n");
      return acc.replaceAll(curr.token, csv);
    }
    return acc.replaceAll(curr.token, curr.answer);
  }, textWithTokens);
}

export default replaceTokens;
