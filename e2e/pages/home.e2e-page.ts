import {ElementFinder, element, by, browser} from 'protractor';
import {waitForUrlContains} from '../utils/waiters.e2e';
import {myClick} from '../utils/utils.e2e';

export class HomePage {
  private hiHeader: ElementFinder;
  private usersList: ElementFinder;
  private logoutButton: ElementFinder;

  constructor() {
    this.hiHeader = element(by.css('[data-id=hi-header]'));
    this.usersList = element(by.css('[data-id=user-list]'));
    this.logoutButton = element(by.css('[data-id="logout-button"]'));
  }

  public async isUserLoggedIn(): Promise<boolean> {
    const currentUrl = await browser.getCurrentUrl();
    if (!currentUrl.includes('/login') &&
      !currentUrl.includes('/register') &&
      await this.hiHeader.isPresent() &&
      await this.usersList.isPresent()) {
        return true;
    }
    return false;
  }

  public logoutUser(): void {
    myClick(this.logoutButton);
    waitForUrlContains('/login');
  }
}