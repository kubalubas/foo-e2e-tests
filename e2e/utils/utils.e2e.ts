import {browser, ElementFinder} from 'protractor';
import {waitForPresence} from './waiters.e2e';

// clear all users
export function clearBrowserData(): void {
  browser.executeScript('window.sessionStorage.clear();');
  browser.executeScript('window.localStorage.clear();');
}

// add user to local storage
export function addUserToLocalStorage(user: any): void {
  browser.executeScript(`window.localStorage.setItem('users', '${JSON.stringify(user)}')`);
  refreshPage();
}

export async function myClick(myElement: ElementFinder): Promise<void> {
  try {
    await waitForPresence(myElement);
    await myElement.click();
  } catch (error) {
    console.warn(error + '\nCannot click: ' + myElement.locator().toString());
  }
}

export async function mySendKeys(myElement: ElementFinder, myString: string): Promise<void> {
  try {
    await waitForPresence(myElement);
    await myElement.clear();
    await myElement.sendKeys(myString);
  } catch (error) {
    console.warn(error + '\nCannot send keys to: ' + myElement.locator().toString());
  }
}

export async function refreshPage(): Promise<void> {
  return await browser.refresh();
}

export async function browserErrorLogger(): Promise<void> {
  const browserLogs = await browser.manage().logs().get('browser');
  browserLogs.forEach((log) => {
    if (log.level.value > 900) { // it's an error log
      console.log(`Browser console error: ${log.message}`);
    }
  });
}
