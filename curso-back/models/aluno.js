import {connection} from "../config/database.js";
import { DataTypes } from "sequelize";

export const Aluno = connection.define("aluno", {

    nome: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    responsavel: { 
        type: DataTypes.STRING,
        defaultValue: "Maior de Idade",
    },
});

