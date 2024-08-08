import {connection, authenticate} from "./config/database.js";
import express from "express";
import { alunosRouter } from "./routes/alunos.js";
import { cursosRouter } from "./routes/cursos.js";
import { professorRouter } from "./routes/professors.js";
import cors from "cors";

authenticate(connection).then(() => {
    connection.sync();
    // connection.sync({ force: true });
});
const app = express();

app.use(express.json()); 

app.use(cors({ origin: "http://localhost:5173" })); 

app.use(alunosRouter);
app.use(cursosRouter);
app.use(professorRouter);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});
