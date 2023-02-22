import { z } from "zod";

/* Text */
export const TextSchema = z.object({
  text: z.string(),
  bold: z.literal(true).optional(),
  underline: z.literal(true).optional(),
});

export type RichTextText = z.infer<typeof TextSchema>;

/* Element */
export type BaseElement = {
  type: string;
  children: RichTextNode[];
};

export interface ParagraphElement extends BaseElement {
  type: "paragraph";
}

export interface FillerElement extends BaseElement {
  type: "filler";
  children: [{ text: "" }];
}

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  alt: string;
  children: [{ text: "" }];
}

export type RichTextElement = FillerElement | ImageElement | ParagraphElement;

export type RichTextNode = RichTextElement | RichTextText;

export const ElementSchema: z.ZodType<RichTextElement> = z.discriminatedUnion(
  "type",
  [
    z.object({
      type: z.literal("paragraph"),
      children: z.lazy(() => NodeSchema.array()),
    }),
    z.object({
      type: z.literal("filler"),
      children: z.tuple([z.object({ text: z.literal("") })]),
    }),
    z.object({
      type: z.literal("image"),
      src: z.string(),
      alt: z.string(),
      children: z.tuple([z.object({ text: z.literal("") })]),
    }),
  ]
);

export const NodeSchema: z.ZodType<RichTextNode> = z.union([
  ElementSchema,
  TextSchema,
]);

export const RootNodesSchema = NodeSchema.array();

export type RootNodes = z.infer<typeof RootNodesSchema>;

export function isElement(node: RichTextNode): node is RichTextElement {
  return (node as RichTextElement).type !== undefined;
}
