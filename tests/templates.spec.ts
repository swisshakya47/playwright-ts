import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { TemplatesPage } from "../pages/TemplatesPage";

test.describe("Templates Page", () => {
  let loginPage: LoginPage;
  let templatesPage: TemplatesPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    templatesPage = new TemplatesPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await loginPage.verifyLoginSuccess();
  });

  test("should navigate to templates page and verify templates before selecting app", async () => {
    await templatesPage.goToTemplates();
    await templatesPage.verifyEmptyTemplate();
  });

  test("should verify send templates page after selecting app", async () => {
    await templatesPage.goToTemplates();
    await templatesPage.selectApp(process.env.APP_NAME!);
    await templatesPage.verifyTemplatesLoaded();
  });

  test('should logout successfully', async () => {
    await templatesPage.logout();
    await loginPage.verifyLogoutSuccess();
  });
});
