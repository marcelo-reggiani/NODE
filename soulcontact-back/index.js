import express from "express";
import { config } from "dotenv";
config(); // Carrega as variaveis do .env
import mongoose from "mongoose";
import { contatosRouter } from "./routes/contatos.js";
import { usuariosRouter } from "./routes/usuarios.js";

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Mongo DB Conectado!");
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(contatosRouter);
app.use(usuariosRouter)

app.use(express.json());


app.listen(3000 , () => {
    console.log("Servidor rodando em http://localhost:3000");
});