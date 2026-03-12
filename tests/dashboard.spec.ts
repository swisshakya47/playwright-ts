import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://push.bhoos.dev/#/login');
  await page.getByRole('textbox', { name: 'admin@example.com' }).fill('swechchya.shakya@bhoos.com');
  await page.getByRole('textbox', { name: '••••••••' }).click();
  await page.getByRole('textbox', { name: '••••••••' }).fill('shakya@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(1000);
  await expect(page.getByRole('heading', { name: 'Select an App' })).toBeVisible();
  await expect(page.getByText("Manage notifications across all your apps")).toBeVisible();
  await page.getByRole('combobox').selectOption('61692bd5-1e6c-40c6-9136-e9dfe5aa02a4');
  await page.waitForTimeout(2000);
  await expect(page.getByRole('heading', { name: 'Marriage-dev' })).toBeVisible();
  await expect(page.getByText("Manage notifications across all your apps")).toBeVisible();

  //Dashboard flow
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByText("Overview of your notification")).toBeVisible();
  await expect(page.locator('div.card').filter({ hasText: 'Total Notifications' })).toBeVisible();;
  await expect(page.locator('div.card').filter({ hasText: 'Total Recipients' })).toBeVisible();;
  await expect(page.locator('div.card').filter({ hasText: 'Successful' })).toBeVisible();;
  await expect(page.locator('div.card').filter({ hasText: 'Failed' })).toBeVisible();;

  //Send Notification flow
  await page.getByRole('link', { name: 'Send Notification' }).click();
  await expect(page.getByRole('heading', { name: 'Send Notification' })).toBeVisible();
  await expect(page.getByText("Send push notifications to your users")).toBeVisible();
  await page.getByRole('button', { name: /All Users/i }).click();
  await page.waitForTimeout(1000); 
  await page.getByRole('button', { name: /Specific Users/i }).click();
  await page.waitForTimeout(1000); 
  await page.getByRole('button', { name: /Topic Subscribers/i }).click();
  await page.waitForTimeout(1000); 
  await page.getByRole('button', { name: /Custom Query/i }).click();
  await page.waitForTimeout(3000); 

  //Templates overflow
  await page.getByRole('link', { name: 'Templates' }).click();
  await page.waitForTimeout(3000); 
  await expect(page).toHaveURL(/templates/); 
  await expect(page.locator('h1', { hasText: 'Templates' })).toBeVisible();
  await expect(page.getByText("Manage notification templates for Marriage-dev")).toBeVisible();

  await page.getByRole('button', { name: /Logout/i }).click(); 
  await page.waitForTimeout(1000);
  await expect(page.getByText(/logged out successful/i)).toBeVisible();


});