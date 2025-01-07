import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class FacebookSignupPage extends BasePage {
    // Selectors
    private readonly firstNameInput = "input[name='firstname']";
    private readonly lastNameInput = "input[name='lastname']";
    private readonly emailInput = "input[name='reg_email__']";
    private readonly emailConfirmInput = "input[name='reg_email_confirmation__']";
    private readonly passwordInput = "input[name='reg_passwd__']";
    private readonly daySelect = "select[name='birthday_day']";
    private readonly monthSelect = "select[name='birthday_month']";
    private readonly yearSelect = "select[name='birthday_year']";
    private readonly genderRadio = "input[name='sex'][value='2']";
    private readonly signupButton = "button[name='websubmit']";

    constructor(page: Page) {
        super(page);
    }

    async navigateToSignup() {
        await this.page.goto('https://www.facebook.com/r.php');
        await this.waitForNavigation();
    }

    async fillSignupForm(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        birthDay: string;
        birthMonth: string;
        birthYear: string;
    }) {
        await this.fillField(this.firstNameInput, userData.firstName);
        await this.fillField(this.lastNameInput, userData.lastName);
        await this.fillField(this.emailInput, userData.email);

        // Handle email confirmation if it appears
        const emailConfirmField = this.page.locator(this.emailConfirmInput);
        if (await emailConfirmField.isVisible()) {
            await this.fillField(this.emailConfirmInput, userData.email);
        }

        await this.fillField(this.passwordInput, userData.password);

        // Fill birthday
        await this.selectDropdownOption(this.daySelect, userData.birthDay);
        await this.selectDropdownOption(this.monthSelect, userData.birthMonth);
        await this.selectDropdownOption(this.yearSelect, userData.birthYear);

        // Select gender
        const genderRadio = this.page.locator(this.genderRadio);
        if (await genderRadio.isVisible()) {
            await genderRadio.click();
        }
    }

    async clickSignup() {
        const signupButton = this.page.locator(this.signupButton);
        if (await signupButton.isVisible()) {
            const navigationPromise = this.page.waitForNavigation();
            await signupButton.click();
            await navigationPromise;
        }
        await this.waitForNavigation();
    }

    async navigateToLogin() {
        try {
            // Try finding login link by text
            const loginLink = this.page.getByRole('link', { name: /log\s*in/i });
            if (await loginLink.isVisible()) {
                await loginLink.click();
            } else {
                // Alternative selectors if the above doesn't work
                const alternativeSelectors = [
                    "a[href*='login']",
                    "a[data-testid*='login']",
                    "a[href*='signin']",
                    "button[name='login']",
                    "[aria-label*='Log In']"
                ];

                for (const selector of alternativeSelectors) {
                    const element = this.page.locator(selector);
                    if (await element.isVisible()) {
                        await element.click();
                        break;
                    }
                }
            }

            await this.waitForNavigation();
            
            // Verify we're on the login page
            const currentUrl = this.page.url();
            expect(currentUrl).toContain('login');
        } catch (error) {
            console.error('Error navigating to login:', error);
            throw error;
        }
    }
} 