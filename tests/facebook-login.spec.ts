import { test, expect, Browser, chromium } from '@playwright/test';
import { FacebookLoginPage } from '../pages/FacebookLoginPage';
import { loginTestData } from './test-data/login-data';

let browser: Browser;

test.describe('Facebook Login Tests', () => {
    let loginPage: FacebookLoginPage;

    // Setup browser once before all tests
    test.beforeAll(async () => {
        browser = await chromium.launch({
            headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            slowMo: 1000
        });
    });

    // Close browser after all tests
    test.afterAll(async () => {
        await browser.close();
    });

    // Setup page for each test
    test.beforeEach(async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        loginPage = new FacebookLoginPage(page);
        await loginPage.navigateToLogin();
    });

    test('should login with valid credentials', async () => {
        await loginPage.login(loginTestData.validUser.email, loginTestData.validUser.password);
        await loginPage.verifyLoginSuccess();
    });

    test('should show error with invalid credentials', async () => {
        await loginPage.login(loginTestData.invalidUser.email, loginTestData.invalidUser.password);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
    });

    test('should navigate to forgot password page', async () => {
        await loginPage.clickForgotPassword();
        // Verify we're on the forgot password page
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).toContain('recover');
    });

    test('should open registration form', async () => {
        await loginPage.clickCreateAccount();
         const isFormVisible = await loginPage.isRegistrationFormVisible();
        expect(isFormVisible).toBeTruthy();
    });
}); 