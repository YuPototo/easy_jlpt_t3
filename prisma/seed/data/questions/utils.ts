import type { RootNodesSchemaType } from "../../../../src/lib/renderer/src/schema";

export function makeParagraph(text: string): string {
  const rawParagraph: RootNodesSchemaType = [
    {
      type: "paragraph",
      children: [{ text }],
    },
  ];

  return JSON.stringify(rawParagraph);
}
