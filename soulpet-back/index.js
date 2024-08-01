import {connection, authenticate} from "./config/database.js";
import express from "express";
import { clientesRouter } from "./routes/clientes.js";
import { petsRouter } from "./routes/pets.js";

authenticate(connection).then(() => {
    // Após conectar no banco de dados ele irá sincronizar os models no banco. OU seja. Irá gerar as tabelas caso necessário
    // force: true -> Irá dropar tudo e criar do zero novamente
    // connection.sync({ force: true });
    connection.sync();
});

// AULA DIA 31/07/2024
// Definir a aplicação backend em Express
// Recursos pré configurados
const app = express();

// Garante que todas as requisições que tem body, seja lidas como JSON
app.use(express.json()); 

// Definir os endpoins do backend (rotas) MODULOS DE ROTAS
app.use(clientesRouter);
app.use(petsRouter);
// Métodos: GET (leitura), POST (inserção), PUT (alteração), DELETE (remoção)
// app.get("/hello", (req, res) => { //manipulador de rota
//     res.res("Hello World!"); // enviando a resposta para quem solicitou
// });


// Rodar a aplicação backend (definir a porta que a APP vai rodar)
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});


