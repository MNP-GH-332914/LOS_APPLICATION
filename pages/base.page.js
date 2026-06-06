// pages/base.page.js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const testData = require('../data/test-data.json'); // Safely load your JSON data profile

export class BasePage {
    constructor(page) {
        this.page = page;
        
        // Find inputs by type and structural attributes
        this.usernameInput = page.locator('input[type="text"], input[formcontrolname="username"]');
        this.passwordInput = page.locator('input[type="password"], input[formcontrolname="password"]');
        
        // Solid selector for the button text
        this.loginButton = page.locator('button:has-text("Login Now")');
    }

    async navigateToLogin() {
        await this.page.goto(testData.baseUrl, { waitUntil: 'commit' });
    }

    async loginAs(roleKey) {
        const user = testData.roles[roleKey];
        if (!user) throw new Error(`Role ${roleKey} does not exist in test-data.json`);

        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
        
        await this.usernameInput.click();
        await this.usernameInput.fill(user.username);
        
        await this.passwordInput.click();
        await this.passwordInput.fill(testData.commonPassword);
        
        await this.loginButton.click();
    }
}
