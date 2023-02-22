/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from "vitest";
import saveParseJson from "./saveParseJson";

describe("saveParseJson", () => {
  it("should return success result", () => {
    const result = saveParseJson('{"a": 1}');
    expect(result.success).toBe(true);
    //@ts-ignore
    expect(result.data).toEqual({ a: 1 });
  });

  it("should return error result", () => {
    const result = saveParseJson("invalid json");
    expect(result.success).toBe(false);
    //@ts-ignore
    expect(result.error).toBeInstanceOf(Error);
  });
});
