// pages/BasePage.ts
import { Page, expect } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  // ── Shared Locators ───────────────────────────────
  protected get selectAppDropdown() {
    return this.page.getByRole("combobox");
  }
  protected get noAppSelectedHeading() {
    return this.page.getByRole("heading", { name: "No App Selected" });
  }
  protected get selectAnAppHeading() {
    return this.page.getByRole("heading", { name: "Select an App" });
  }
  protected get dashboardLink() {
    return this.page.getByRole("link", { name: "Dashboard" });
  }
  protected get sendNotificationLink() {
    return this.page.getByRole("link", { name: "Send Notification" });
  }
  protected get templatesLink() {
    return this.page.getByRole("link", { name: "Templates" });
  }
  protected get logoutButton() {
    return this.page.getByRole("button", { name: /logout/i });
  }
  protected get profileSection() {
    return this.page.getByText("Swechchya - Member", { exact: true });
  }
  // ── Shared Actions ────────────────────────────────
  async selectApp(appName: string) {
    await this.selectAppDropdown.selectOption({ label: appName });
  }

  async selectFirstApp() {
    await this.selectAppDropdown.selectOption({ index: 1 });
  }

  async goToDashboard() {
    await this.dashboardLink.click();
  }

  async goToSendNotification() {
    await this.sendNotificationLink.click();
  }

  async goToTemplates() {
    await this.templatesLink.click();
  }
  
  async goToProfile() {
    await this.profileSection.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  // ── Shared Assertions ─────────────────────────────
  async verifySelectAnAppHeading() {
    await expect(this.selectAnAppHeading).toBeVisible();
  }

  async verifyNoAppSelected() {
    await expect(this.noAppSelectedHeading).toBeVisible();
  }

  async verifyAppDropdownVisible() {
    await expect(this.selectAppDropdown).toBeVisible();
  }

  async verifyOnDashboardPage() {
    await expect(this.page).toHaveURL("/#/");
  }

  async verifyOnProfilePage() {
    await expect(this.page).toHaveURL("/#/profile");
  }

  async verifyOnSendNotificationPage() {
    await expect(this.page).toHaveURL("/#/send");
  }

  async verifyOnTemplatesPage() {
    await expect(this.page).toHaveURL("/#/templates");
  }
 
}
