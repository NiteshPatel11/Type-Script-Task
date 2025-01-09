import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FacebookLoginPage extends BasePage {
     private readonly emailInput = "input[name='email']";
    private readonly passwordInput = "input[name='pass']";
    private readonly loginButton = "button[name='login']";
    private readonly errorMessage = "div[class*='error']";
    private readonly forgotPasswordLink = "a[href*='recover']";
    private readonly createAccountButton = "a[data-testid='open-registration-form-button']";
    private readonly registrationForm = "div[class*='registration-form']";

    constructor(page: Page) {
        super(page);
    }
 
    async navigateToLogin() {
        await this.page.goto("https://www.facebook.com/");
        await this.waitForNavigation();
    }

    async login(email: string, password: string) {
        await this.fillField(this.emailInput, email);
        await this.fillField(this.passwordInput, password);
        
         const navigationPromise = this.page.waitForNavigation();
        await this.clickElement(this.loginButton);
        await navigationPromise;
    }

    async getErrorMessage() {
        const errorElement = this.page.locator(this.errorMessage);
        if (await errorElement.isVisible()) {
            return await errorElement.textContent();
        }
        return null;
    }

    async clickForgotPassword() {
        await this.clickElement(this.forgotPasswordLink);
        await this.waitForNavigation();
    }

    async clickCreateAccount() {
        await this.clickElement(this.createAccountButton);
      }

    async verifyLoginSuccess() {
         await this.page.waitForSelector("div[role='navigation']", { timeout: 10000 });
        const currentUrl = this.page.url();
        expect(currentUrl).not.toContain('/login');
    }
         
} 

