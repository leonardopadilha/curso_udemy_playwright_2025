import { test, expect } from "@playwright/test"

test("Alterar o DOM e verificar o elemento inserido", async ({ page }) => {
    // Abre a página de exemplo
    await page.goto("https://www.example.com")

    // Insere um novo elemento no DOM
    await page.evaluate(() => {
        const newDiv = document.createElement("div")
        newDiv.textContent = "Este é um novo elemento adicionado pelo Playwright!"
        newDiv.id = "novo-elemento"
        newDiv.style.color = "blue"
        document.body.appendChild(newDiv)
    })

    // Verifica se o novo elemento foi adicionado ao DOM com o conteúdo correto
    const newElement = page.locator("#novo-elemento")
    await expect(newElement).toHaveText("Este é um novo elemento adicionado pelo Playwright!")

    // (Opcional) Tira uma captura de tela para ver a alteração
    await page.screenshot({ path: "alteracao_dom.png" })
})