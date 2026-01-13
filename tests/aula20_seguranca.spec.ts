import { test, expect } from "@playwright/test";

test.describe("XSS Protection", () => {
    const targetURL = "https://todomvc.com/examples/react/dist/";

    test("should prevent XSS attacks", async ({ page }) => {
        await page.goto(targetURL)

        const maliciousScript = '<script>alert("XSS")</script>'

        // Intercepta e substitui o comportamento do alert
        await page.evaluate(() => {
            window.alert = () => {
                throw new Error("Alert was triggered!")
            }
        })

        await page.fill(".new-todo", maliciousScript)
        await page.keyboard.press("Enter")

        // Tenta verificar se o alerta foi acionado
        let alertTriggered = false
        try {
            await page.waitForEvent("dialog", { timeout: 1000 }) // Aguarda qualquer diálogo
            alertTriggered = true
        } catch {
            alertTriggered = false // Nenhum alerta foi exibido
        }

        expect(alertTriggered).toBeFalsy()

        // Verifica se o script foi sanitizado na UI
        const displayedText = await page.textContent(".todo-list li label")
        expect(displayedText).not.toContain("<script>")
    })
})

test.describe("Directory Traversal Protection", () => {
    const targetURL = "https://www.example.com"

    test("should not allow access to sensitive files", async ({ page }) => {
        const sensitivePaths = ["/etc/passwd", "/.env", "/config.json"]

        for (const path of sensitivePaths) {
            const response = await page.goto(`${targetURL}${path}`)
            expect(response!.status()).toBe(404)
        }
    })
})