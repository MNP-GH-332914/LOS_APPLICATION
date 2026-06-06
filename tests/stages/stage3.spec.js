import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base.page.js';

test('PD Credit Valuation and Recommendations', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateToLogin();
    await basePage.loginAs('CO');
});
