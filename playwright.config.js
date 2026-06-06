// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { isDatabaseConfigured } from './lib/env-check.js';
// Run the evaluation check and save the flag state globally
process.env.DB_ENABLED = isDatabaseConfigured() ? 'true' : 'false';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, 
  reporter: 'html',
  
  use: {
    baseURL: "https://uatngl.manappuram.com/los/#/login",
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
