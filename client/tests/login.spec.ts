import { expect, test } from "@playwright/test";

test("A user should be logged in", async ({ page }) => {
  await page.goto("https://localhost:3000/login");

  await expect(page).toHaveTitle(/Playwright/);
});
