import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";


test.describe("Playwright Navigation Bar Click Test", () => {
  test("Click each navigation bar link one by one", async ({ page }) => {
    const homePage = new HomePage(page);

     await homePage.navigateToHomePage();

     await homePage.clickEachNavLink();
  });
});