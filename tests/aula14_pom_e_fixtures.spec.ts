import { expect } from "@playwright/test";
import { test } from "./aula14_pomFixture";
import * as data from "./aula14_addTocart-test-data.json";

test.describe("Page object test demo", async () => {
  test("Register test_01", async ({ page, registerPage }) => {
    await page.goto(
      `https://ecommerce-playground.lambdatest.io/index.php?route=account/register`
    );
    await registerPage.enterFirstName(data.firstname);
    await registerPage.enterLastName(data.lastname);
    await registerPage.enterEmail(data.email);
    await registerPage.enterTelephone(data.phone_number);
    await registerPage.enterPassword(data.password);
    await registerPage.enterConfirmPassword(data.password);
    expect(registerPage.isSubscribeChecked()).toBeChecked();
    await registerPage.clickTermandConditon();
    await registerPage.clickContinueToRegister();
  });

  test("Login test_02", async ({ page, loginPage }) => {
    await page.goto(
      `https://ecommerce-playground.lambdatest.io/index.php?route=account/login`
    );
    await loginPage.enterEmail(data.email);
    await loginPage.enterLoginPassword(data.password);
    await loginPage.clickLoginBtn();
    expect(await page.title()).toBe("My Account");
  });
});
