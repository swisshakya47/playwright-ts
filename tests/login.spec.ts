import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page', () => {

  let loginPage: LoginPage;
  //  ↑ 'let' because we assign it in beforeEach

  // Runs before every test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });


  // TEST 1 — Check page loaded correctly
  test('should display login page correctly', async ({ page }) => {

    await loginPage.verifyPageLoaded();
  });


  // TEST 2 — Valid login
  test('should login successfully with valid credentials', async ({ page }) => {

    await loginPage.login(
      process.env.EMAIL!,
      process.env.PASSWORD!
    );

    await loginPage.verifyLoginSuccess();
  });


  // TEST 3 — Invalid login
  test('should fail with invalid credentials', async ({ page }) => {
    await loginPage.login(
      'wrong@email.com',
      'wrongpassword'
    );

    await loginPage.verifyLoginFailed();
  });
});