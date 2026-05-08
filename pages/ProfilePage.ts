import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProfilePage extends BasePage {
  private get pageHeading() {
    return this.page.getByRole("heading", { name: "Profile " });
  }
  private get pageSubHeading() {
    return this.page.getByText("Manage your account settings");
  }
  private get userInfoHeading() {
    return this.page.getByRole("heading", { name: "User Information" });
  }
  //Target main content only - not sidebar
  private get userName() {
    return this.page
      .getByRole("main")
      .getByText(process.env.USERNAME!, { exact: true });
  }

  private get userEmail() {
    return this.page
      .getByRole("main")
      .getByText(process.env.EMAIL!, { exact: true });
  }

  private get userRole() {
    return this.page
      .getByRole("main")
      .getByText(process.env.ROLE!, { exact: true });
  }

  private get userStatus() {
    return this.page
      .getByRole("main")
      .getByText(process.env.STATUS!, { exact: true });
  }

  private get changePasswordHeading() {
    return this.page.getByRole("heading", { name: "Change Password" });
  }

  private get currentPassword() {
    return this.page.getByPlaceholder("Enter Current Password");
  }

  private get newPassword() {
    return this.page.getByPlaceholder("Enter New Password");
  }
  private get confirmNewPassword() {
    return this.page.getByPlaceholder("Confirm New Password");
  }

  async verifyProfilePageLoaded() {
    await this.verifyOnProfilePage();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.pageSubHeading).toBeVisible();
  }

  async verifyUserInfoExists() {
    await expect(this.userInfoHeading).toBeVisible();
    await expect(this.userName).toBeVisible();
    await expect(this.userEmail).toBeVisible();
    await expect(this.userRole).toBeVisible();
    await expect(this.userStatus).toBeVisible();
  }

  async verifyChangePasswordExists() {
    await expect(this.changePasswordHeading).toBeVisible();
    await expect(this.currentPassword).toBeVisible();
    await expect(this.newPassword).toBeVisible();
    await expect(this.confirmNewPassword).toBeVisible();
  }
}
