import { test, expect } from '@playwright/test';
import { BasePage } from '../../pages/base.page.js'; // Note the explicit .js extension

test('SO User Login and Application Submission', async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.navigateToLogin();
    await basePage.loginAs('SO');
});
