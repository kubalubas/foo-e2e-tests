import {ElementFinder, element, by} from 'protractor';

export class LoginPage {
  private usernameInput: ElementFinder;
  private passwordInput: ElementFinder;
  private loginButton: ElementFinder;

  constructor() {
    this.usernameInput = element(by.css('[data-id=username-input]'));
    this.passwordInput = element(by.css('[data-id=password-input]'));
    this.loginButton = element(by.css('[data-id=login-button]'));
  }

  public fillUsername(username: string): LoginPage {
    this.usernameInput.sendKeys(username);
    return this;
  }

  public fillPassword(password: string): LoginPage {
    this.passwordInput.sendKeys(password);
    return this;
  }

  public submitForm(): void {
    this.loginButton.click();
  }

  public async isAlertDisplayed(): Promise<boolean> {
    return element(by.css('[data-id=alert-message]')).isPresent();
  }

  public async getAlertMessage(): Promise<string> {
    if (await this.isAlertDisplayed()) {
      return await element(by.css('[data-id=alert-message]')).getText();
    }
    return '';
  }
}