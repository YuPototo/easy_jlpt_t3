import type { RootNodesSchemaType } from "./schema";

export function createRichText(text: string) {
  const richText: RootNodesSchemaType = [
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
