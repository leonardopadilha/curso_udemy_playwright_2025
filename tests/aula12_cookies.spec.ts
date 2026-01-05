import { test, expect } from "@playwright/test";

test("Exemplo de manipulação e verificação de cookies", async ({ page, context }) => {
  // Define um cookie antes de navegar para a página
  const cookie = {
    name: "example_cookie",
    value: "cookie_value",
    domain: "example.com",
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Strict" as "Strict",
  };
  
  await context.addCookies([cookie]);

  // Intercepta a requisição para verificar o cookie sendo enviado
  await page.route("https://www.example.com/*", async (route, request) => {
    const cookies = await context.cookies();
    console.log("Cookies atuais:", cookies);

    // Aqui você pode verificar se o cookie esperado está presente
    const exampleCookie = cookies.find((c) => c.name === "example_cookie");
    if (exampleCookie) {
      console.log(
        "Cookie example_cookie está presente com valor:",
        exampleCookie.value
      );
    } else {
      console.log("Cookie example_cookie não foi encontrado.");
    }

    // Continue a requisição
    route.continue();
  });

  // Navega até o site onde o cookie será enviado
  await page.goto("https://www.example.com");

  // Verifica se o cookie está presente após a navegação
  const cookiesAfterNavigation = await context.cookies();
  const hasExampleCookie = cookiesAfterNavigation.some(
    (c) => c.name === "example_cookie"
  );
  console.log("Cookie presente após navegação:", hasExampleCookie);

  // Exemplo de assertiva para garantir que o cookie existe
  expect(hasExampleCookie).toBeTruthy();
});
