import {connection, authenticate} from "./config/database.js";
import { Curso } from "./models/curso.js";
import { Aluno } from "./models/aluno.js";
import { Professor } from "./models/professor.js";


authenticate(connection).then(() => {
    connection.sync();
    // connection.sync({ force: true });
});