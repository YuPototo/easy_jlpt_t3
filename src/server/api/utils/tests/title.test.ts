import { expect, test } from "vitest";

import { titleToUniqueTitle } from "../title";

test("titleToUniqueTitle", () => {
  expect(titleToUniqueTitle("A Title")).toBe("a-title");
  expect(titleToUniqueTitle("Another Title")).toBe("another-title");
});
