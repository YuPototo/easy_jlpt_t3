import { z } from "zod";

/**
 * Todo: 需要 refactor
 * 这里用了不少 hack
 */

/* Text */
export const TextSchema = z.object({
  text: z.string(),
  bold: z.literal(true).optional(),
  underline: z.literal(true).optional(),
});

export type RichTextTextType = z.infer<typeof TextSchema>;

/* Element */
export type BaseRichTextElementType = {
  type: string;
  children: RichTextNodeType[];
};

export type ImageElementType = {
  type: "image";
  src: string;
  alt: string;
  children: RichTextNodeType[];
};

export type RichTextElementType = BaseRichTextElementType | ImageElementType;

export type RichTextNodeType = RichTextElementType | RichTextTextType;

export const ElementSchema: z.ZodType<RichTextElementType> = z.object({
  type: z.string(),
  children: z.lazy(() => NodeSchema.array()),
  src: z.string().optional(),
  alt: z.string().optional(),
});

export const NodeSchema: z.ZodType<RichTextNodeType> = z.union([
  ElementSchema,
  TextSchema,
]);

export const RootNodesSchema = NodeSchema.array();

export type RootNodesSchemaType = z.infer<typeof RootNodesSchema>;

export function isElement(node: RichTextNodeType): node is RichTextElementType {
  return (node as RichTextElementType).type !== undefined;
}
