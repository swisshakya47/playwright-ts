import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SendNotificationPage } from "../pages/SendNotificationPage";

test.describe("SendNotification Page", () => {
  let loginPage: LoginPage;
  let sendNotificationPage: SendNotificationPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    sendNotificationPage = new SendNotificationPage(page);
    await loginPage.goto();
    await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
    await loginPage.verifyLoginSuccess();
  });

  test("should navigate to send notification and verify empty send notification before selecting app", async () => {
    await sendNotificationPage.goToSendNotification();
    await sendNotificationPage.verifyEmptySendNotification();
  });

  test("should verify send notification page after selecting app", async () => {
    await sendNotificationPage.goToSendNotification();
    await sendNotificationPage.selectApp(process.env.APP_NAME!);
    await sendNotificationPage.verifySendNotificationLoaded();
  });

  test("should switch between various audience tabs", async () => {
    await sendNotificationPage.goToSendNotification();
    await sendNotificationPage.selectApp(process.env.APP_NAME!);
    await sendNotificationPage.verifySendNotificationLoaded();
    await sendNotificationPage.clickAllUsersButton();
    await sendNotificationPage.clickSpecificUsersButton();
    await sendNotificationPage.clickTopicSubscribersButton();
    await sendNotificationPage.clickCustomQueryButton();
  });

  test('should logout successfully', async () => {
    await sendNotificationPage.logout();
    await loginPage.verifyLogoutSuccess();
  });

});
