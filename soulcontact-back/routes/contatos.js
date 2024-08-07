import { Contato } from "../models/contato.js";
import { Router } from "express";
import { contatoValidation } from "../utils/validations.js";

export const contatosRouter = Router();

// INSERÇÃO DO CONTATO POST
contatosRouter.post("/contatos", async (req, res) => {
    // error -> Objeto com detalhes dos erros de validação
    // value -> São os dados do req.body
    const { error, value } = contatoValidation.validate(req.body, {abortEarly: false});

    if(error) {
        // HTTP 400 - Bad Request - Indica que a requisão tem dados invalidos
        res.status(400).json({ message: "Dados Invalidos", error: error.details});
        return;
    }
    console.log(value);
    console.log(req.body);
    // Extrair as informações dos contatos que foram validados anteriormente
    const { nome, sobrenome, email, telefone, observacoes, favorito } = value;

    try {
        const novoContato = new Contato({nome, sobrenome, email, telefone, observacoes, favorito});
        await novoContato.save();
        res.json({ Message: "Contato criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um ERRO ao adicionar contato", erro: err });
    }
});

// LISTAGEM DOS CONTATOS GET
// Essa opção exclui os campos que não quer que seja exibidos:   .select('-__v'); Nesse caso a Versão não será exibida
contatosRouter.get("/contatos", async (req, res) => {
    const lista = await Contato.find().select('-__v');
    res.json(lista);
});

//LISTAGEM DE UM CONTATO GET
contatosRouter.get("/contatos/:id", async (req, res) => {
    const contato = await Contato.findById(req.params.id);

    if(contato) {
        res.json(contato);
    } else {
        res.status(404).json({ message: "Contato não encontrado." });
    };
});

// ATUALIZAÇÃO DE CONTATO PUT
contatosRouter.put("/contatos/:id", async (req, res) => {
    const { nome, sobrenome, email, telefone, observacoes, favorito } = req.body;

    try {
        // Procura o contato indicado pelo id. Se existir ele será atualizado
        const contato = await Contato.findByIdAndUpdate(req.params.id, { nome, sobrenome, email, telefone, observacoes, favorito });

        if(contato) {
            res.json({ message: "Contato atualizado com sucesso!"});
        } else {
            res.status(404).json({ message: "Contato não encontrado." });
        };

    } catch (err) {
        res.status(500).json({ message: "Ocorreu um ERRO ao atualizar o contato", erro: err })
    }
});

// REMOÇÃO DO CONTATO DELETE
contatosRouter.delete("/contatos/:id", async (req, res) => {
    try {
        const contato = await Contato.findByIdAndDelete(req.params.id);
        if(contato) {
            res.json({ message: "Contato Deletado com sucesso!"});
        } else {
            res.status(404).json({ message: "Contato não encontrado." });
        };
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um ERRO ao deletar o contato", erro: err })
    }
});

