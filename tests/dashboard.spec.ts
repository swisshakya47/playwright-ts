import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test.describe("Dashboard Page", () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await loginPage.verifyLoginSuccess();
  });
  test("verify empty dashboard before selecting app", async () => {
    await dashboardPage.verifyEmptyDashboard();
  });

  test("should display dashboard after selecting app", async () => {
    await dashboardPage.selectApp(process.env.APP_NAME!);
    await dashboardPage.verifyDashboardLoaded();
  });

  test("should navigate to profile ", async () => {
    await dashboardPage.goToProfile();
    await dashboardPage.verifyOnProfilePage();
  });
  test("should navigate to send notification ", async () => {
    await dashboardPage.goToSendNotification();
    await dashboardPage.verifyOnSendNotificationPage();
  });
  test("should navigate to templates ", async () => {
    await dashboardPage.goToTemplates();
    await dashboardPage.verifyOnTemplatesPage();
  });
  test("logout successfully", async () => {
    await dashboardPage.logout();
    await loginPage.verifyLogoutSuccess();
  });
});
