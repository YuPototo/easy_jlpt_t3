import type { RootNodes } from "../../../../src/lib/renderer/src/schema";

export function makeParagraph(text: string): string {
  const rawParagraph: RootNodes = [
    {
      type: "paragraph",
      children: [{ text }],
    },
  ];

  return JSON.stringify(rawParagraph);
}
