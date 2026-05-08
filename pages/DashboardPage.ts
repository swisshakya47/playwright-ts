import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

// 'extends BasePage' = inherits everything from BasePage!
export class DashboardPage extends BasePage {

  private get pageHeading() {
    return this.page.getByRole('heading', { name: 'Dashboard' });
  }

  private get totalNotificationsCard() {
    return this.page.getByText('Total Notifications');
  }

  private get totalRecipientsCard() {
    return this.page.getByText('Total Recipients');
  }

  private get successfulCard() {
    return this.page.getByText('Successful', {exact: true});
  }

  private get failedCard() {
    return this.page.getByText('Failed');
  }

  private get emptyStateMessage() {
    return this.page.getByText('Please select an app from the dropdown above');
  }


  // ── Dashboard Specific Assertions ─────────────────
  // Before selecting app
  async verifyEmptyDashboard() {
    await this.verifyOnDasboardPage();
    await this.verifyNoAppSelected();        // ← from BasePage!
    await expect(this.emptyStateMessage).toBeVisible();
  }

  // After selecting app
  async verifyDashboardLoaded() {
    await this.verifyOnDasboardPage();
    await expect(this.pageHeading).toBeVisible();
    await expect(this.totalNotificationsCard).toBeVisible();
    await expect(this.totalRecipientsCard).toBeVisible();
    await expect(this.successfulCard).toBeVisible();
    await expect(this.failedCard).toBeVisible();
  }
}
