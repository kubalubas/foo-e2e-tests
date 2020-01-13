
import {browser} from 'protractor';
import {LoginPage} from '../pages/login.e2e-page';
import {clearBrowserData} from '../utils/utils.e2e';

describe('L02 - Check login with invalid user data', () => {

  const loginPage = new LoginPage();

  beforeAll(() => {
    // open home page url
    browser.get(browser.params.baseUrl);
  });

  afterAll(() => {
    // removing local and session storage after test
    clearBrowserData();
    // close browser after test
    browser.close();
  })

  it('"Username or password is incorrect" alert on login page', () => {
    loginPage
      .fillUsername('InValidUser')
      .fillPassword('qwe123')
      .submitForm();

      expect(loginPage.getAlertMessage()).toContain('Username or password is incorrect', 'Check failure screenshot in /testresult folder.');
  });
});
