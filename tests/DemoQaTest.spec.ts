import { test, expect } from "@playwright/test";
import { DemoQaPage } from "../pages/DemoQaPage";

test("should fill and submit the form on DemoQA", async ({ page }) => {
  // Create an instance of DemoQaPage
  const demoQaPage = new DemoQaPage(page);

  // Navigate to the page
  await demoQaPage.navigateToPage();

  // Fill the form
  await demoQaPage.fillUserName("nitesh patel");
  await demoQaPage.fillEmail("niteshpatel@gmail.com");
  await demoQaPage.fillCurrentAddress("indore");
  await demoQaPage.fillPermanentAddress("indore MP");

  // Submit the form
  await demoQaPage.clickSubmit();

  // Verify submission
  const outputText = await demoQaPage.getOutputText();
  expect(outputText).toContain("nitesh patel");
  expect(outputText).toContain("niteshpatel@gmail.com");
  expect(outputText).toContain("indore");
  expect(outputText).toContain("indore MP");
});
