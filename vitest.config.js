import path from "path";
import { configDefaults } from "vitest/config";

export default {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    exclude: [...configDefaults.exclude, "**/e2e/**"],
  },
};
