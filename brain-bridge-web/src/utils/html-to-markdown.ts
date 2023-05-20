import TurndownService from "turndown";

export default function htmlToMarkdown(html: string) {
  const markdown = new TurndownService().turndown(html).replace(/\{.*\}/g, "")
  return markdown;
}