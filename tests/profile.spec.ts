import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";

test.describe("Profile Page ", () => {
    let loginPage: LoginPage;
    let profilePage: ProfilePage;


      test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        await loginPage.goto();
        await loginPage.login(process.env.EMAIL!, process.env.PASSWORD!);
        await loginPage.verifyLoginSuccess();
      });

      test("Navigate to profile section and verify the profile page is loaded", async() => {
        await profilePage.goToProfile();
        await profilePage.verifyOnProfilePage();
        await profilePage.verifyProfilePageLoaded();
      });

      test("Verify user information", async() => {
        await profilePage.goToProfile();
        await profilePage.verifyOnProfilePage();
        await profilePage.verifyUserInfoExists();
      });

      test("Verify Change Password section exits", async() => {
        await profilePage.goToProfile();
        await profilePage.verifyOnProfilePage();
        await profilePage.verifyChangePasswordExists();
      });

      test(" verify successful logout", async() => {
        await profilePage.logout();
        await loginPage.verifyLogoutSuccess();
      });
});