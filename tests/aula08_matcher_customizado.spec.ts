import { test, Locator, expect } from "@playwright/test"

const customMatcher = {
    async toHaveTextContent(locator: Locator, expectedText: string, options = { caseSensitive: true}) {
        const actualText = await locator.textContent()
        let pass: boolean

        if (options.caseSensitive) {
            pass = actualText?.includes(expectedText) ?? false
        } else {
            pass = actualText?.toLowerCase().includes(expectedText.toLowerCase()) ?? false
        }

        return {
            pass,
            message: () => 
                pass ? `Expected element not to have text content: "${expectedText}"` : 
                       `Expected element to have text content: "${expectedText}" but found "${actualText}"`
        }
    }
}

expect.extend(customMatcher)

declare global {
    namespace PlaywrightTest {
        interface Matchers<R> {
            toHaveTextContent(
                expectedText: string,
                options?: { caseSensitive?: boolean}
            ): Promise<R>
        }
    }
}

test("Custom matcher to check text content", async ({ page }) => {
    // Navega até a página de exemplo
    await page.goto("https://www.example.com")

    // Localiza o elemento que será verificado
    const element = page.locator("h1")

    // Usa o matcher customizado toHaveTextContent
    await expect(element).toHaveTextContent("EXample Domain", {
        caseSensitive: false
    })
})