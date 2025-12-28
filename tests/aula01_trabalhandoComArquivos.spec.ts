import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test("Acessa o site e copia o arquivo", async ({ page }) => {
    // Parte 1: Acessar o site
    const URL = "https://www.example.com"
    await page.goto(URL)
    await expect(page).toHaveURL(URL)

    // Parte 2: Copiar o arquivo
    const sourcePath = path.join(__dirname, "../arquivos/teste.txt")
    const destinationPath = path.join(__dirname, "teste.txt")

    try {
        fs.copyFileSync(sourcePath, destinationPath)
        console.log("Arquivo copiado com sucesso para o repositório.")
    } catch (error) {
        console.error("Erro ao copiar o arquivo: ", error)
    }
})