
import {browser} from 'protractor';
import {LoginPage} from '../pages/login.e2e-page';
import {clearBrowserData, addUserToLocalStorage} from '../utils/utils.e2e';
import {HomePage} from '../pages/home.e2e-page';

describe('L01 - Check login with valid user data', () => {

  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const user = [
    {
      "firstName": "Test",
      "lastName": "User",
      "username": "TestUser",
      "password": "qwe123",
      "id": 1
    }
  ];
  beforeAll(() => {
    // open home page url
    browser.get(browser.params.baseUrl);
    // prepare test user 
    addUserToLocalStorage(user);
  });

  afterAll(() => {
    // logout user
    homePage.logoutUser();
    // removing local and session storage after test
    clearBrowserData();
  })

  it('User should Login into an application', () => {
    loginPage
      .fillUsername('TestUser')
      .fillPassword('qwe123')
      .submitForm();
      
    expect(homePage.isUserLoggedIn()).toBeTruthy('User is not logged in. Check failure screenshot in /testresult folder.');
  });
});
