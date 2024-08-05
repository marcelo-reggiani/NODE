import { Usuario } from "../models/usuario.js";
import { Router } from "express";
import { usuarioValidation } from "../utils/validations.js";

export const usuariosRouter = Router();

// INSERÇÃO DO CONTATO POST
usuariosRouter.post("/usuarios", async (req, res) => {
    // error -> Objeto com detalhes dos erros de validação
    // value -> São os dados do req.body
    const { error, value } = usuarioValidation.validate(req.body, {abortEarly: false}); // VERIFICAR USUARIO VALIDATION

    if(error) {
        // HTTP 400 - Bad Request - Indica que a requisão tem dados invalidos
        res.status(400).json({ message: "Dados Invalidos", error: error.details});
        return;
    }

    // Extrair as informações dos usuarios que foram validoados anteriormente
    const { nomeUsuario, emailUsuario, senhaUsuario } = value;

    try {
        const novoUsuario = new Usuario({ nomeUsuario, emailUsuario, senhaUsuario });
        await novoUsuario.save();
        res.json({ Message: "Usuario criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um ERRO ao adicionar Usuario", erro: err })
    }
});

// LISTAGEM DOS USUARIOS GET
// Essa opção exclui os campos que não quer que seja exibidos:   .select('-__v'); Nesse caso a Versão não será exibida
usuariosRouter.get("/usuarios", async (req, res) => {
    const lista = await Usuario.find().select('-__v');
    res.json(lista);
});

//LISTAGEM DE UM USUARIO GET
usuariosRouter.get("/usuarios/:id", async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);

    if(usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: "Usuário não encontrado." });
    };
});

// ATUALIZAÇÃO DE USUARIO PUT
usuariosRouter.put("/usuarios/:id", async (req, res) => {
    const { nomeUsuario, emailUsuario, senhaUsuario } = req.body;

    try {
        // Procura o usuario indicado pelo id. Se existir ele será atualizado
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, { nomeUsuario, emailUsuario, senhaUsuario });

        if(usuario) {
            res.json({ message: "Usuário atualizado com sucesso!"});
        } else {
            res.status(404).json({ message: "Usuário não encontrado." });
        };

    } catch (err) {
        res.status(500).json({ message: "Ocorreu um ERRO ao atualizar o Usuário", erro: err })
    }
});

// REMOÇÃO DO USUARIO DELETE
usuariosRouter.delete("/usuarios/:id", async (req, res) => {
    try {
        const usuario = await Usuário.findByIdAndDelete(req.params.id);
        if(usuario) {
            res.json({ message: "Usuário Deletado com sucesso!"});
        } else {
            res.status(404).json({ message: "Usuário não encontrado." });
        };
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um ERRO ao deletar o Usuário", erro: err })
    }
});
