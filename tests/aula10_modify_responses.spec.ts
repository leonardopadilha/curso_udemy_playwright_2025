import { test, expect } from "@playwright/test"

test("Gets the json from api and adds a new fruit", async ({ page }) => {
    // Get the response and add to it
    await page.route("*/**/api/v1/fruits", async (route) => {
        const response = await route.fetch()
        const json = await response.json()
        for (const fruit of json) {
            if (fruit.name === "Loquat") {
                console.log("Fruit: ", fruit)
            }
        }
        json.push({ name: "Loquat", id: 100 })
        
        for (const fruit of json) {
            if (fruit.name === "Loquat") {
                console.log("New Fruit: ", fruit)
            }
        }
        // Fullfill using the original response, while patching the response body
        // with the given JSON object
        await route.fulfill({ response, json }) // Está substituindo o json original pelo novo json com a fruta Loquat
    })

    // Go tho the page
    await page.goto("https://demo.playwright.dev/api-mocking")

    // Assert that the new fruit is visible
    await expect(page.getByText("Loquat", { exact: true})).toBeVisible()
})