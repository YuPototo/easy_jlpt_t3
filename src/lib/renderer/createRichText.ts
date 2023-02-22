import type { RootNodes } from "./schema";

export function createRichText(text: string) {
  const richText: RootNodes = [
    {
      type: "paragraph",
      children: [
        {
          text,
        },
      ],
    },
  ];

  return JSON.stringify(richText);
}
