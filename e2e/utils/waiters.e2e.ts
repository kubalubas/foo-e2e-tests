import {browser, ElementFinder, protractor} from 'protractor';

const E2E_TIMEOUT = browser.params.E2E_TIMEOUT;

export async function wait(customWait?: number): Promise<void> {
  return await browser.sleep(customWait || 200);
}

export function waitForPresence(myElement: ElementFinder, customTimeout: number = E2E_TIMEOUT): object {
  return browser.wait(protractor.ExpectedConditions.presenceOf(myElement), customTimeout, `Element: ${myElement} is not present.`);
}

export function waitForNotPresence(myElement: ElementFinder, customTimeout: number = E2E_TIMEOUT): object {
  return browser.wait(protractor.ExpectedConditions.not(protractor.ExpectedConditions.presenceOf(myElement)), customTimeout, `Element: ${myElement} is present.`);
}

export function waitForClickable(myElement: ElementFinder, customTimeout: number = E2E_TIMEOUT): object {
  return browser.wait(protractor.ExpectedConditions.elementToBeClickable(myElement), customTimeout, `Element: ${myElement} is not clickable.`);
}

export function waitForUrlContains(url: string, customTimeout: number = E2E_TIMEOUT): object {
  return browser.getCurrentUrl().then(myUrl => {
    return browser.wait(protractor.ExpectedConditions.urlContains(url), customTimeout, `URL does not contain: ${url}, and is: ${myUrl}`);
  });
}

export function waitForCondition(promise, testFn, customTimeout: number = E2E_TIMEOUT, customErrorMessage?: string): object {
  return browser.wait(() => {
    return promise.then(data => testFn(data));
  }, customTimeout, customErrorMessage);
}

export async function waitForPageTitle(title: string, customTimeout: number = E2E_TIMEOUT): Promise<object> {
  return browser.wait(protractor.ExpectedConditions.titleIs(title), customTimeout, `Page title is not ${title}.`);
}

export function waitForElementsPresence(elements: ElementFinder[]): void {
  elements.forEach(singleElement => {
    waitForPresence(singleElement);
  });
}
