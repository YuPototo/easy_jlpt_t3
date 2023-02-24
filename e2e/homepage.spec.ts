import { test, expect } from "@playwright/test";

test("should show home page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  // The new page should contain an h1 with "About Page"
  await expect(page.locator("h1")).toContainText("Easy JLPT");
});

test("should enter section page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const bookTitle = "N2 Words"; // 由 seed db 填入的数据
  await page.getByRole("link", { name: bookTitle }).click();

  await expect(page).toHaveURL(new RegExp("http://localhost:3000/books/"));

  await expect(page.locator("h1")).toContainText(bookTitle);
});

test("Book page should show sections", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const bookTitle = "N2 Words"; // 由 seed db 填入的数据
  await page.getByRole("link", { name: bookTitle }).click();

  await expect(page.locator("ol li a")).toHaveCount(2); // 2 个 section
});

//todo: 点击 section 后进入做题页
