import { test } from "@playwright/test"

const URL = "https://apis.google.com/js/plusone.js"

test("Intercept network request", async ({ page }) => {
    // Log and continue all network requests
    await page.route("**", (route) => {
        console.log(route.request().url())
        if (route.request().url() == URL)
            console.log("Encontrei o " + route.request().url())
        route.continue()
    })
    await page.goto("http://todomvc.com")
})