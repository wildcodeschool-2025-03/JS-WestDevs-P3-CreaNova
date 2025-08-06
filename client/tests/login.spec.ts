import { expect, test } from "@playwright/test";
import "dotenv/config";

test("A user should be logged in", async ({ page }) => {
  const password = process.env.PASSWORD_TEST;

  await page.goto("http://localhost:3000/login");

  const emailInput = page.locator("input[type='email']");

  await emailInput.fill("abolfazl@example.com");

  const passwordInput = page.locator("input[type='password']");

  await passwordInput.fill(password as string);

  const button = page.locator("button");

  await button.click();

  const toast = page.getByText("Vous êtes connecté", { exact: true });

  await expect(toast).toBeVisible();
});
