import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SendNotificationPage extends BasePage {
  //-loactors-
  private get pageHeading() {
    return this.page.getByRole("heading", { name: "Send Notification" });
  }
  private get subPageHeading() {
    return this.page.getByText("Send push notifications to your users");
  }
  private get emptySendNotificationMessage() {
    return this.page.getByText("Please select an app to send notifications");
  }
  private get allUsersButton() {
    return this.page.getByRole("button", { name: /All Users/i });
  }

  private get specificUsersButton() {
    return this.page.getByRole("button", { name: /Specific Users/i });
  }

  private get topicSubscribersButton() {
    return this.page.getByRole("button", { name: /Topic Subscribers/i });
  }
  private get customQueryButton() {
    return this.page.getByRole("button", { name: /Custom Query/i });
  }

  //-Actions-
  async clickAllUsersButton() {
    await this.allUsersButton.waitFor({ state: 'visible' }); 
    await this.allUsersButton.click();
  }
  async clickSpecificUsersButton() {
    await this.specificUsersButton.waitFor({ state: 'visible' }); 
    await this.specificUsersButton.click();
  }
  async clickTopicSubscribersButton() {
    await this.topicSubscribersButton.waitFor({ state: 'visible' }); 
    await this.topicSubscribersButton.click();
  }
  async clickCustomQueryButton() {
    await this.customQueryButton.waitFor({ state: 'visible' }); 
    await this.customQueryButton.click();
  }

  //-Assertions-
    async verifyAllTabsVisible() {
    await expect(this.allUsersButton).toBeVisible();
    await expect(this.specificUsersButton).toBeVisible();
    await expect(this.topicSubscribersButton).toBeVisible();
    await expect(this.customQueryButton).toBeVisible();
  }

  async verifyEmptySendNotification() {
    await expect(this.page).toHaveURL("/#/send");
    await this.verifyNoAppSelected(); // ← from BasePage!
    await expect(this.emptySendNotificationMessage).toBeVisible();
  }

  async verifySendNotificationLoaded() {
    await expect(this.page).toHaveURL("/#/send");
    await expect(this.pageHeading).toBeVisible();
    await expect(this.subPageHeading).toBeVisible();
    await this.verifyAllTabsVisible();
  }
}
