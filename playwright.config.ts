import { defineConfig, devices } from '@playwright/test';
import { testPlanFilter } from "allure-playwright/dist/testplan";
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  //testDir: './tests-e2e', //use tests for unit tests and tests-e2e for e2e
  /* Maximum time one test can run for. */
  testDir: './tests-e2e',
  timeout: 3 * 60 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 1 * 60 * 1000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  grep: testPlanFilter(),
  reporter: [['html'],
  ['allure-playwright',
  {
    detail: true,
    outputFolder: "my-allure-results",
    suiteTitle: false,
  },
]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.DYN365_ORGURL,
    screenshot: 'on',
    httpCredentials: {
      username: 'mlaxmanraj',
      password: 'Thangam@123456',
    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    storageState: '/storage-state/storageState.json',
  },
  globalSetup: require.resolve('./globals/global-setup'),
  globalTeardown: require.resolve('./globals/global-teardown'),
   /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: 
      { 
        ...devices['Desktop Chrome'], 
        storageState: '/storage-state/storageState.json' 
      },
    },    

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});


