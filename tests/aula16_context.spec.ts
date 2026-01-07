import { test, expect } from "@playwright/test"
const playwright = require("playwright")

const URL = "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"

test("Test1", async () => {
    const browser = await playwright.chromium.launch({ headless: false })
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(URL)
    await page.locator("input[name=email]").type("teste@teste.com")
    await page.locator("input[name=password]").type("1234")
    await page.locator("input[value=Login]").click()
    expect(await page.title()).toBe("My Account")

    const page2 = await context.newPage()
    await page2.goto(URL)
    expect(await page2.title()).toBe("My Account")
    
    const context1 = await browser.newContext() // não compartilha cookies/cache com outros browsers
    // const page3 = await context1.newPage()
    // await page3.goto(URL)
    // expect(await page3.title()).toBe("My Account")

})