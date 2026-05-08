import { Page, expect } from "@playwright/test";

export class LoginPage {
  //     ↑ 'export' so other files can import and use this class

  constructor(private page: Page) {}
  //          ↑ 'private' means only THIS class can use 'page'
  //          When you create LoginPage(page),
  //          it stores the page automatically

  //-Locators-
  private get emailInput() {
    return this.page.locator('input[type="email"]');
  }
  private get passwordInput() {
    return this.page.locator('input[type="password"]');
  }
  private get signInButton() {
    return this.page.getByRole("button", { name: /sign in/i });
  }
  private get successToast() {
    return this.page.getByText(/login successful/i);
  }
  private get logoutToast() {
    return this.page.getByText(/logged out successful/i);
  }
  private get pageHeading() {
    return this.page.getByRole("heading", { name: "Bhoos" });
  }
  private get subHeading() {
    return this.page.getByText("Sign in to Bhoos Notify Hub");
  }

  //-Actions-
  async goto() {
    await this.page.goto("/");
  }
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  async clickSignIn() {
    await this.signInButton.click();
  }
  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickSignIn();
  }

  //-Assertions-
  //Verify the login page loaded correctly
  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle("Notify Hub - Bhoos");
    await expect(this.page).toHaveURL("/#/login");
    await expect(this.pageHeading).toBeVisible();
    await expect(this.subHeading).toBeVisible();
  }

  // Verify login was SUCCESSFUL
  async verifyLoginSuccess() {
    await expect(this.successToast).toBeVisible();
    await expect(this.page).not.toHaveURL("/#/login");
  }

  // Verify login FAILED
  async verifyLoginFailed() {
    await expect(this.page).toHaveURL("/#/login");
    await expect(this.successToast).not.toBeVisible();
  }

  // Verify logout was successful
  async verifyLogoutSuccess() {
    await expect(this.logoutToast).toBeVisible();
    await expect(this.page).toHaveURL("/#/login");
  }
}
