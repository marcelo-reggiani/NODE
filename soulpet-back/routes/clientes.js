import { Cliente } from "../models/cliente.js";
import { Endereco } from "../models/endereco.js";
import { Router } from "express";

// Cria o modulo de rotas
export const clientesRouter = Router();

// Listagem de todos os clientes
clientesRouter.get("/clientes", async (req, res) => {
    // SELECT * FROM clientes;
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes);
});

// Listagem de um cliente específico (ID =?)
// :id => É um parâmetro de rota. Lista um cliente especifico
clientesRouter.get("/clientes/:id", async (req, res) => {
    //SELECT * FROM clientes WHERE id = 1   E o INCLUDE adiciona o Endereço ao cliente. "JOIN"
    const cliente = await Cliente.findOne({ where: { id: req.params.id }, include: [Endereco] });

    if(cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({message: "Cliente não encontrado"});
    }
});

clientesRouter.post("/clientes", async (req, res) => {
    // Extraimos os dados do body que serão usados na inserção
    const { nome, email, telefone, endereco } = req.body;

    try {
        // Tentativa de inserir o cliente
       await Cliente.create(
        {nome, email, telefone, endereco}, {include: [Endereco]}, // Indicamos que o endereço será salvo e associado ao cliente
       );
       res.json({message: "Cliente criado com sucesso"});
    } catch(err) {
        // Tratamento caso ocorra algum erro
        // (500) - Internal Error
        res.status(500).json({messsage: "Um erro ocorreu ao inserir o cliente."});
    }
});

clientesRouter.put("/clientes/:id", async (req, res) => {
    // Checar se o cliente existe
    const idCliente = req.params.id;
    const {nome, email, telefone, endereco} = req.body;

    try {
        const cliente = await Cliente.findOne({ where: { id: idCliente } });
        if(cliente){
            // Atualiza a linha do endereço que o id do cliente for igual ao id do cliente sendo atualizado
            await Endereco.update(endereco, { where: { clienteId: idCliente } });
            await cliente.update({nome, email, telefone});
            res.json({message: "Cliente atualizado"});
        } else {
            res.status(404).json({message: "O cliente não encontrado"});
        }
    } catch(err) {
        res.status(500).json({message: "Ocorreu um erro ao atualizar o cliente"});
    }
});

clientesRouter.delete("/clientes/:id", async (req, res) => {
    const idCliente = req.params.id;

    try {
        const cliente = await Cliente.findOne({ where: {id: idCliente} });

        if(cliente) {
            await cliente.destroy();
            res.json({message: "Cliente removido com sucesso!"});
        } else {
            res.status(404).json({message: "Cliente não encontrado"});
        }
    } catch (err) {
        res.status(500).json({message: "Um erro ocorreu ao excluir cliente"});
    }
});