import { test } from "@playwright/test"

/*
addInitScript => Injeta e executa scripts diretamente no navegador

Antes de qualquer script da página rodar.


Aspectos                | AddInitScript                                     | Evaluate
Momento de execução     | Antes de qualquer script da página rodar          | Depois que a página já foi carregada
Uso                     | Configurar o ambiente inicial                     | Interagir com o conteúdo da página
Persistência            | Persiste em futuras navegações no mesmo contexto  | Não persiste, deve ser chamado novamente
Acesso ao DOM           | O DOM pode não estar completamente carregado      | Acessa o DOM na sua forma atual
Modificação de scripts | Pode substituir ou configurar APIs antes da página | Interage com a página como está

*/

// Extende o tipo global para incluir a propriedade __appConfig no objeto window
declare global {
    interface Window {
      __appConfig: {
        apiUrl: string;
        featureFlag: boolean;
      };
    }
}

test("Adiciona uma variável global na página", async ({ page }) => {
    // Adiciona uma variável global antes que os scripts da página sejam executados
    await page.addInitScript(() => {
        window.__appConfig = {
            apiUrl: "https://api.mockserver.com",
            featureFlag: true
        }
    })

    // Vai até a página de teste
    await page.goto("https://www.example.com")

    // Verifica se a variável global foi injetada corretamente
    const appConfig = await page.evaluate(() => window.__appConfig )
    console.log("Configuração injetada: ", appConfig)

    // Validações no teste
    if (appConfig.apiUrl !== "https://api.mockserver.com") {
        throw new Error("API URL não configurada corretamente!")
    }
})

