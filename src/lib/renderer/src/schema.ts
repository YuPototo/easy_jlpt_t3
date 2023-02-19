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

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  alt: string;
  children: [{ text: "" }];
}

export type RichTextElement = BaseElement | ImageElement;

export type RichTextNode = RichTextElement | RichTextText;

export const ElementSchema: z.ZodType<RichTextElement> = z.object({
  type: z.string(),
  children: z.lazy(() => NodeSchema.array()),
  src: z.string().optional(),
  alt: z.string().optional(),
});

export const NodeSchema: z.ZodType<RichTextNode> = z.union([
  ElementSchema,
  TextSchema,
]);

export const RootNodesSchema = NodeSchema.array();

export type RootNodes = z.infer<typeof RootNodesSchema>;

export function isElement(node: RichTextNode): node is RichTextElement {
  return (node as RichTextElement).type !== undefined;
}
