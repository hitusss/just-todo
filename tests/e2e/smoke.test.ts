import { test } from "@playwright/test";

test("Smoke test", async ({ page }) => {
  await page.goto("/");
});
