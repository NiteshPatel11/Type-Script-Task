import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async fillField(selector: string, value: string) {
        const field = this.page.locator(selector);
        await field.waitFor({
            state: 'visible',
            timeout: 5000
        });
        await field.fill(value);
    }

    protected async selectDropdownOption(selector: string, value: string) {
        const dropdown = this.page.locator(selector);
        await dropdown.waitFor({
            state: 'visible',
            timeout: 5000
        });
        await dropdown.selectOption(value);
    }

    protected async clickElement(selector: string) {
        const element = this.page.locator(selector);
        await element.waitFor({
            state: 'visible',
            timeout: 5000
        });
        await element.click();
    }

    protected async waitForNavigation() {
        await this.page.waitForLoadState('networkidle');
    }
} 