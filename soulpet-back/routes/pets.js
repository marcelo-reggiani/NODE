import { Pet } from "../models/pet.js";
import { Cliente } from "../models/cliente.js";
import { Router } from "express";

export const  petsRouter = Router();

// AULA 01/08/2024
// POST - Inserir um novo PET
petsRouter.post("/pets", async (req, res) => {
    const { nome, tipo, porte, dataNasc, clienteId } = req.body

    try {
        const cliente = await Cliente.findByPk(clienteId);
        if (cliente) {
            await Pet.create({ nome, tipo, porte, dataNasc, clienteId });
            res.json({message: "Pet Criado com Sucesso"});
        } else {
            res.status(404).json({ message: "Falha ao inserir pet. Cliente não encontrado" });
        }
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um erro ao adicionar pet." });
    }
});

// PUT - Atualizar um PET
petsRouter.put("/pets/:id", async (req, res) => {
    const { nome,tipo, porte, dataNasc } = req.body;

    try {
        const pet = await Pet.findByPk(req.params.id);
        if(pet) {
            await pet.update({ nome, tipo, porte, dataNasc });
            res.json({ message: "Pet atualizado com SUCESSO"})
        } else {
            res.status(404).json({ message: "Pet não encontrado" });
        }
    } catch (error) {
        
    }
});


// LISTAR PET
petsRouter.get("/pets", async (req, res) => {
    const listaPets = await Pet.findAll();
    res.json(listaPets);
});

petsRouter.get("/pets/:id", async (req, res) => {
    // include: [{model: Cliente, attributes: ["id", "nome"]}] }); no include model ele escolhe os atributos que serão exibidos
    // include: [{ model: Cliente, attributes: {exclude: ["senha"]} }], nessa opção ele tira o Atributo informado e tras o restante
    // attributes: { exclude: ["createdAt", "updatedAt"]}, Podemos escolher o que NÃO será exibido pelo exclude
    const pet = await Pet.findOne({ where: { id: req.params.id }, attributes: { exclude: ["createdAt", "updatedAt"]}, include: [{model: Cliente, attributes: ["id", "nome"]}] });

    if(pet) {
        res.json(pet);
    } else {
        res.status(404).json({message: "Pet não encontrado"});
    }
});

petsRouter.delete("/pets/:id", async (req, res) => {
    try {
      const pet = await Pet.findByPk(req.params.id);
      if (pet) {
        await pet.destroy();
        res.json({ message: "Pet removido com sucesso" });
      } else {
        res.status(404).json({ message: "Pet não encontrado." });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao excluir pet" });
    }
  });

  
// petsRouter.delete("/pets/:id", async (req, res) => {
//     const idPet = req.params.id;
//     try {
//         const pet = await Pet.findOne({ where: {id: idPet} });
//         if(pet) {
//             await pet.destroy();
//             res.json({message: "Pet removido com sucesso!"});
//         } else {
//             res.status(404).json({message: "Pet não encontrado"});
//         }
//     } catch (err) {
//         res.status(500).json({message: "Um erro ocorreu ao excluir Pet"});
//     }
// });