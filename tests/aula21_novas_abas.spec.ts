import { test } from "@playwright/test";

test("Deve abrir uma nova aba ao clicar no botão", async ({ page, context }) => {
    // Carrega a página HTML local
    const URL = "caminho-arquivo-index.html"
    await page.goto(URL)

    // Aguarda a nova aba ser aberta após clicar no botão
    const [newTab] = await Promise.all([
        context.waitForEvent('page'), // Aguarda a nova aba ser criada
        page.click("#openTabButton") // Clica no botão com id "openTabButton"
    ])

    // Aguarda a nova aba carregar
    await newTab.waitForLoadState()

    console.log("The page title is: " + (await newTab.title()))
})