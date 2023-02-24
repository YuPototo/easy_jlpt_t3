import type { RootNodes } from "@/lib/renderer/schema";

export function makeParagraph(text: string): string {
  const rawParagraph: RootNodes = [
    {
      type: "paragraph",
      children: [{ text }],
    },
  ];

  return JSON.stringify(rawParagraph);
}
