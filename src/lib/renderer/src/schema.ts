import { z } from "zod";

/* Text */
export const TextSchema = z.object({
  text: z.string(),
  bold: z.literal(true).optional(),
  underline: z.literal(true).optional(),
});

export type RichTextTextType = z.infer<typeof TextSchema>;

/* Element */
export type RichTextElementType = {
  type: string;
  children: RichTextNodeType[];
};

export type RichTextNodeType = RichTextElementType | RichTextTextType;

export const ElementSchema: z.ZodType<RichTextElementType> = z.object({
  type: z.string(),
  children: z.lazy(() => NodeSchema.array()),
});

export const NodeSchema: z.ZodType<RichTextNodeType> = z.union([
  ElementSchema,
  TextSchema,
]);

export const RootNodesSchema = NodeSchema.array();

export function isElement(node: RichTextNodeType): node is RichTextElementType {
  return (node as RichTextElementType).type !== undefined;
}
