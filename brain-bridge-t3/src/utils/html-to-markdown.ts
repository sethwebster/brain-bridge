import * as Showdown from "showdown";


export default function htmlToMarkdown(html: string): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const service = new Showdown.Converter();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const md = service.makeMarkdown(html).replace(/\{.*\}/g, "");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return md;
}

export function cleanUpHtml(html: string): string {
  return htmlToMarkdown(html);
}