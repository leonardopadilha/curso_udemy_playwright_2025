import { chromium, test as baseTest } from "@playwright/test";
// É praticamente um override
import RegisterPage from "./aula14_registerPage";
import LoginPage from "./aula14_loginPage";
import HomePage from "./aula14_homePage";
import SpecialHotPage from "./aula14_specialHotPage";

import path from "path";

type pages = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
  homePage: HomePage;
  specialPage: SpecialHotPage;
};

const testPages = baseTest.extend<pages>({
  // dentro do extend é qual tipo de dados ele vai ser
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
    // use é basicamente um override ( use)
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  specialPage: async ({ page }, use) => {
    await use(new SpecialHotPage(page));
  },
});

export const test = testPages;
export const expect = testPages.expect;
