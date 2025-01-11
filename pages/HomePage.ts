import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly navLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navLinks = this.page.locator("nav a");
  }

   async navigateToHomePage() {
    await this.page.goto("https://playwright.dev/");
  }

   async clickEachNavLink() {
    const linkCount = await this.navLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = this.navLinks.nth(i);

       await link.scrollIntoViewIfNeeded();

      const linkText = await link.textContent();
      console.log(`Clicking link: ${linkText}`);

       try {
        await link.click({ timeout: 5000 });  
      } catch (error) {
        console.warn(
          `Skipping link "${linkText}" due to visibility or click issue.`
        );
        continue;
      } 
       await this.page.waitForLoadState("networkidle"); 
       await this.navigateToHomePage();
    }
  }
}
