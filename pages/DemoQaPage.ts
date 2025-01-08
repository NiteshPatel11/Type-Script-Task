import { Page, Locator } from "playwright";

export class DemoQaPage {
  private page: Page;
  private userNameField: Locator;
  private emailField: Locator;
  private currentAddressField: Locator;
  private permanentAddressField: Locator;
  private submitButton: Locator;
  private output: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameField = page.locator("#userName");
    this.emailField = page.locator("#userEmail");
    this.currentAddressField = page.locator("#currentAddress");
    this.permanentAddressField = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");
    this.output = page.locator(".border");
  }

  async navigateToPage() {
    await this.page.goto("https://demoqa.com/text-box");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async fillUserName(name: string) {
    await this.userNameField.waitFor({ state: "visible" });
    await this.userNameField.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailField.waitFor({ state: "visible" });
    await this.emailField.fill(email);
  }

  async fillCurrentAddress(address: string) {
    await this.currentAddressField.waitFor({ state: "visible" });
    await this.currentAddressField.fill(address);
  }

  async fillPermanentAddress(address: string) {
    await this.permanentAddressField.waitFor({ state: "visible" });
    await this.permanentAddressField.fill(address);
  }

  async clickSubmit() {
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }

  async getOutputText(): Promise<string | null> {
    if (await this.output.isVisible()) {
      return this.output.textContent();
    }
    return null;
  }
}
