import { test, expect } from "@playwright/test";
import mysql from "mysql2";

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "world",
})

// Função para conectar e buscar as cidades
const fetchCities = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        connection.query("SELECT NAME FROM city WHERE CountryCode = 'BRA';", (err, results) => {
            if (err) {
                reject(err)
            } else {
                // Verifique se o resultado é um array e extraia os nomes das cidades
                const cityNames = (results as mysql.RowDataPacket[]).map((row) => row.name)
                resolve(cityNames)
            }
        })
    })
} 

test.describe("Teste de Banco de Dados MySQL", () => {
    test("Deve buscar todos os nomes das cidades", async () => {
        // Conectar ao banco de dados e buscar os nomes das cidades
        const cities = await fetchCities()

        // Verifique se a consulta retornou pelo menos uma cidade
        expect(cities.length).toBeGreaterThan(0)

        // Log para ver os nomes das cidades
        console.log(`Cidades encontradas: ${cities}`)

        // Verifique se ao menos uma cidade foi retornada
        expect(cities[0]).not.toBeUndefined()
    })
})