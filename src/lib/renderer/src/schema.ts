import { z } from "zod";

/* Text */
export const TextSchema = z.object({
  text: z.string(),
});

export type TextType = z.infer<typeof TextSchema>;

/* Element */

export type ElementType = {
  type: string;
  children: NodeType[];
};

export type NodeType = ElementType | TextType;

export const ElementSchema: z.ZodType<ElementType> = z.object({
  type: z.string(),
  children: z.lazy(() => NodeSchema.array()),
});

export const NodeSchema: z.ZodType<NodeType> = z.union([
  ElementSchema,
  TextSchema,
]);
