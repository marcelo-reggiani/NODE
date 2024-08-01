import { config } from "dotenv";
config(); // Carrega as variaveis do .env para a nossa aplicação

import { Sequelize } from "sequelize";

// Objeto usado na conexão do banco de Dados
export const connection = new Sequelize(
    process.env.DB_NAME, // Acessa o valor da variavel DB_NAME
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
);

export async function authenticate(connection) {
    // Tentar a conexão com o banco mysql
    try {
        await connection.authenticate();
        console.log("Conexão foi feita com Sucesso!");
    } catch(err) { // Se houver erro na conexão
        console.log("Um erro aconteceu: ", err);
    }
};