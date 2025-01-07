import { test, expect } from '@playwright/test';

test.describe('Basic navigation tests', () => {
  test('should navigate to Playwright homepage', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://playwright.dev/');
    
    // Verify title contains Playwright
    await expect(page).toHaveTitle(/Playwright/);
    
    // Verify main heading is visible
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should navigate to docs page', async ({ page }) => {
    // Navigate to the page
    await page.goto('https://playwright.dev/');
    
    // Click the docs link
    await page.getByRole('link', { name: 'Docs', exact: true }).click();
    
    // Verify we're on the docs page
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});
