import { test, expect } from '@playwright/test';

/*
Esse cenário pode ser gerado com a ajuda do codegen do playwright. Ao abrir o navegador com o 
codegen, é possível gerar um snapshot da página em formato de texto, clique em "Assert snapshot" e
selecione a área desejada para que o playwright gere o código conforme abaixo.
*/

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page.getByLabel('Main', { exact: true })).toMatchAriaSnapshot(`
    - link "Playwright logo Playwright":
      - /url: /
      - img "Playwright logo"
      - text: ""
    - link "Docs":
      - /url: /docs/intro
    - link "API":
      - /url: /docs/api/class-playwright
    - button "Node.js"
    - link "Community":
      - /url: /community/welcome
    `);
});