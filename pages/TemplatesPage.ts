import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TemplatesPage extends BasePage {
    
  private get pageHeading() {
    return this.page.getByRole("heading", { name: "Templates", exact: true });
  }

  private get emptyStateMessage() {
    return this.page.getByText("Please select an app to manage templates");
  }

  private get pageSubHeading() {
    return this.page.getByText("Manage notification templates for Marriage-dev");
  }

  private get noTemplatesHeading() {
  return this.page.getByRole('heading', { name: 'No Templates Yet' });
  }

  private get noTemplatesMessage() {
    return this.page.getByText('Create your first notification template');
  }

  async verifyEmptyTemplate() {
    await this.verifyOnTemplatesPage();
    await this.verifySelectAnAppHeading();
    await this.verifyNoAppSelected();
    await expect(this.emptyStateMessage).toBeVisible();
  }

  async verifyTemplatesLoaded() {
    await this.verifyOnTemplatesPage();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.pageSubHeading).toBeVisible();
    await expect(this.noTemplatesHeading).toBeVisible();
    await expect(this.noTemplatesMessage).toBeVisible(); 
   }
}
