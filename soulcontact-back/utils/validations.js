import Joi from "joi";

// Validação para inserção/atualização de um contato
// Validação para a inserção/atualização de um contato
export const contatoValidation = Joi.object({
    nome: Joi.string().max(150).required(),
    sobrenome: Joi.string().max(150),
    email: Joi.string().email(),
    telefone: Joi.string().required(),
    observacoes: Joi.string().max(200),
    favorito: Joi.boolean(),
});

export const usuarioValidation = Joi.object({
    nomeUsuario: Joi.string().max(150).required(),
    emailUsuario: Joi.string().email(),
    senhaUsuario: Joi.string().max(8).required(),
  });