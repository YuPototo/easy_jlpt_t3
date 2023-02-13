import { TextSchema, NodeSchema, ElementSchema } from "../schema";
import { describe, it, expect } from "vitest";

describe("TextSchema", () => {
  it("should parse a text", () => {
    const result = TextSchema.safeParse({ text: "text" });
    expect(result.success).toBeTruthy();
  });

  it("should not parse when text is missing", () => {
    const result = TextSchema.safeParse({});
    expect(result.success).toBeFalsy();
  });
});

describe("NodeSchema", () => {
  it("should success when parse a text node", () => {
    const result = NodeSchema.safeParse({ text: "text" });
    expect(result.success).toBeTruthy();
  });

  it("should not success when input is an empty object", () => {
    const result = NodeSchema.safeParse({});
    expect(result.success).toBeFalsy();
  });

  it("should success when parsing an element", () => {
    const result = NodeSchema.safeParse({
      type: "element",
      children: [{ text: "text" }],
    });
    expect(result.success).toBeTruthy();
  });

  it("should not parse when type is missing in an Element", () => {
    const result = NodeSchema.safeParse({
      children: [{ text: "text" }],
    });
    expect(result.success).toBeFalsy();
  });

  it("should not parse when children is missing in an Element", () => {
    const result = NodeSchema.safeParse({
      type: "element",
    });
    expect(result.success).toBeFalsy();
  });
});

describe("ElementSchema", () => {
  it("should success when parsing an element", () => {
    const result = ElementSchema.safeParse({
      type: "element",
      children: [{ text: "text" }],
    });
    expect(result.success).toBeTruthy();
  });

  it("should not parse when type is missing in an Element", () => {
    const result = ElementSchema.safeParse({
      children: [{ text: "text" }],
    });
    expect(result.success).toBeFalsy();
  });

  it("should not parse when children is missing in an Element", () => {
    const result = ElementSchema.safeParse({
      type: "element",
    });
    expect(result.success).toBeFalsy();
  });
});
