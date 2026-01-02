import { test } from "@playwright/test"

/*
O evaluate basicamente permite a execução de código javascript dentro do contexto da página do navegador
durante a execução do teste.

Depois que a página já foi carregada.

Aspectos                | AddInitScript                                     | Evaluate
Momento de execução     | Antes de qualquer script da página rodar          | Depois que a página já foi carregada
Uso                     | Configurar o ambiente inicial                     | Interagir com o conteúdo da página
Persistência            | Persiste em futuras navegações no mesmo contexto  | Não persiste, deve ser chamado novamente
Acesso ao DOM           | O DOM pode não estar completamente carregado      | Acessa o DOM na sua forma atual
Modificação de scripts | Pode substituir ou configurar APIs antes da página | Interage com a página como está
*/

test("Evaluate in browser context", async ({ page }) => {
    await page.goto("https://example.com/")
    const dimensions = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth, // Retorna a largura do viewport em pixels
            height: document.documentElement.clientHeight // Retorna a altura do viewport em pixels
        }
    })
    console.log(dimensions)

    const links = await page.evaluate(() => {
        const linkElements = Array.from(document.querySelectorAll("a")) // Seleciona todos os links
        return linkElements.map((link) => link.href) // Extrai o atributo href de cada linha
    })

    console.log(links) // Impreime todas as URLs coletadas
})