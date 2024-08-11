import {connection} from "../config/database.js";
import { DataTypes } from "sequelize";
import { Professor } from "./professor.js";
import { Aluno } from "./aluno.js";


export const Curso = connection.define("curso", {

    nome: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    turno: { 
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    professorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'professors', 
          key: 'id',
        },
      },

});


Curso.hasOne(Professor, { onDelete: "CASCADE"});
Professor.belongsTo(Curso);

Curso.hasMany(Aluno, { onDelete: "CASCADE" });
Aluno.belongsTo(Curso);

