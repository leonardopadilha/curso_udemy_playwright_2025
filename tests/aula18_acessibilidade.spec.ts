import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Homepage", () => {
    test("should not have any automatically detectable accessibility issues", async ({ page }) => {
        await page.goto("https://www.example.com")

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
        console.log(accessibilityScanResults)
        expect(accessibilityScanResults.violations).toEqual([])
    })
})

/*
AxeBuilder => É uma ferramenta utilizada para testes automatizados de acessibilidade em páginas web. Ele
faz parte do pacote axe-core, desenvolvido pela Deque Systems, e é amplamente utilizado para verificar
conformidade com padrões de acessibilidade como WCAG (Web Content Accessibility Guidelines)
*/