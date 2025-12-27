import { test, expect } from '@playwright/test';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config()

test("Gera um número aleatório de 3 dígitos via ChatGPT e valida a exibição na página", async ({ page }) => {
    // Obtém a chave API do arquivo .env
    const openai = new OpenAI({ 
        apiKey: process.env.OPENAI_API_KEY // Obtém a chave diretamente da variável de ambiente
    });

    // Faz a solicitação ao ChatGPT para gerar um número aleatório de 3 dígitos
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "Você é um gerador de números aleatórios."},
            { role: "user", content: "Por favor, gere um número aleatório de 3 dígitos."}
        ]
    })

    // Exatrai a resposta do ChatGPT
    const chatResponse = response.choices[0]?.message?.content?.trim()

    // Usa uma expressão regular para extrair apenas o número de 3 dígitos
    const match = chatResponse?.match(/\b\d{3}\b/) // Procura por 3 dígitos consecutivos

    // Verifica se encontramos um número de 3 dígitos
    const generatedNumber = match ? match[0] : null
    console.log("Número gerado pelo ChatGPT: ", generatedNumber)

    // Valida que o número é válido e possui 3 dígitos
    expect(generatedNumber).toBeDefined()
    expect(generatedNumber?.length).toBe(3)

    // Define o conteúdo da página
    await page.setContent(`
        <html>
            <head>
                <title>Teste de Número Aleatório</title>
            </head>
            <body>
                <h1>Número gerado: </h1>
                <p id="generated-number">${generatedNumber}</p>
            </body>
        </html>
    `)

    // Valida que o número gerado aparece na página
    const displayedNumber = await page.locator("#generated-number").textContent()
    expect(displayedNumber).toBe(generatedNumber)
})
