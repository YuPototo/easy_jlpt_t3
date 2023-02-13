import { TextSchema } from "./schema";
import { describe, it, expect } from "vitest";

describe("TextSchema", () => {
  it("should be a zod schema", () => {
    const result = TextSchema.safeParse({ text: "text" });
    expect(result.success).toBeTruthy();
  });
});
