// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: Cada propriedade que definimos vira uma coluna da tabela

import {connection} from "../config/database.js";
import { DataTypes } from "sequelize";
import { Endereco } from "./endereco.js";
import { Pet } from "./pet.js";

// OBS: O Sequelize define implicitamente a chave primaria
export const Cliente = connection.define("cliente", {
    // Configurando a coluna 'nome' 
    nome: { // nome VARCHAR(130) NOT NULL
        type: DataTypes.STRING(130), // Define a coluna 'nome' como VARCHAR.  STRING = VARCHAR
        allowNull: false, // Torna a coluna NOT NULL. Se deixar true o campo nome não sera obrigatório
    },
    email: { // email VARCHAR(255) UNIQUE NOT NULL
        type: DataTypes.STRING,  // Por padrão vai ser 255 porque não usei o ( ) para informar o valor
        allowNull: false,
        unique: true, // Define os dados da coluna como UNIQUE - Não pode ser repetido
    },
    telefone: { // telefone VARCHAR(255) UNIQUE NOT NULL
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
});

// Associação 1:1 (Cliente-Endereço) - Cliente tem um Endereço - Endereço vai ganhar uma chave estrangeira
// CASCADE -  Indica que se o cliente for deletado. O endereço será deletado de forma automatica.
Cliente.hasOne(Endereco, {onDelete: "CASCADE"}); // Ao deletar o cliente. o comando:  {onDelete: "CASCADE"} vai apagar o endereço junto
Endereco.belongsTo(Cliente); // Gera uma chave estrangeira na tabela de endereços

// Associação de 1:N (Cliente-Pet)
Cliente.hasMany(Pet, {onDelete: "CASCADE"});
Pet.belongsTo(Cliente); // Gera uma chave estrangeira para indicar o responsavel

// Cliente = model = gerenciar a tabela de clientes

// Cliente.findAll() -> Listar todos os clientes na tabela
// Cliente.update(novosDados) -> atualizar um cliente específico
// Cliente.destroy() -> apagar o cliente da tabela
// Cliente.findOne