import { test } from '@playwright/test';
import { FacebookLoginPage } from '../pages/FacebookLoginPage';

test.describe('Facebook Login Tests', () => {
    let loginPage: FacebookLoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new FacebookLoginPage(page);
        await loginPage.navigateToLogin();
    });

    test('should login with valid credentials', async () => {
        await loginPage.login('your_test_email@example.com', 'your_test_password');
        await loginPage.verifyLoginSuccess();
    });

    test('should show error with invalid credentials', async () => {
        await loginPage.login('invalid@example.com', 'wrongpassword');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBeTruthy();
    });

    test('should navigate to forgot password page', async () => {
        await loginPage.clickForgotPassword();
        // Add verification for forgot password page
    });

    test('should open registration form', async () => {
        await loginPage.clickCreateAccount();
        // Add verification for registration form
    });
}); 