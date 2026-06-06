import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base.page.js';

test('PD Sales and Valuation', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateToLogin();
    await basePage.loginAs('SO'); // Logs in using Sales User
});
