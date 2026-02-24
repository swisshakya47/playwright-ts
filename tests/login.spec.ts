import { test, expect } from '@playwright/test';

test('Launching the browser', async ({ page }) => {
  await page.goto('https://push.bhoos.dev');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("NotifyHub - Multi-App Notification Service");
  await page.waitForTimeout(3000); 
  });

test('login to bhoos notification', async ({ page }) => {
  await page.goto('https://push.bhoos.dev');

  await expect(page).toHaveURL("https://push.bhoos.dev/#/login");
  await expect(page.getByText("Welcome Back")).toBeVisible();
  console.log("Welcome Back is viewed as expected");

  await expect(page.getByText("Sign in to your account")).toBeVisible();
  console.log("Sign in page is viewed as expected");
  await page.waitForTimeout(3000); 
  });

test('Signing the page', async ({ page }) => {
  await page.goto('https://push.bhoos.dev/#/login');

  await expect(page.locator('input[type="email"]')).toBeVisible();

  await page.locator('input[type="email"]').fill('swechchya.shakya@bhoos.com');
  console.log("Enter email succesfully"),
  await page.locator('input[type="password"]').fill('shakya@123');
  console.log("Enter password successfully ")

  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL("https://push.bhoos.dev/#/");
  console.log("logged in successfully!!!")

  await page.waitForTimeout(3000);
});






