import { test, chromium } from "@playwright/test";

test.describe("audit", () => {
    test("run lighthouse", async () => {
        const { playAudit } = await import("playwright-lighthouse"); // Dinamic import

        const browser = await chromium.launch({
            args: ["--remote-debugging-port=9222"],
            headless: true
        })

        const page = await browser.newPage()
        await page.goto("https://www.example.com")

        await playAudit({
            page: page,
            thresholds: {
                performance: 50,
                accessibility: 90,
                "best-practices": 90,
                seo: 50
            },
            port: 9222
        })
        await browser.close()
    })
})