import { test } from "@playwright/test"

test.use({
    locale: 'en-US',
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    permissions: ['geolocation'],
    headless: false,
})

test("Mobile and geolocation", async ({ page }) => {
    await page.goto("https://maps.google.com")
    await page.locator("//div[@jstcache='484']").click()
    await page.waitForLoadState("networkidle")
    await page.screenshot({ path: "colosseum-iphone.png" })
    await page.close()
})