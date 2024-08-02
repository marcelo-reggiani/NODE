import { Professor } from "../models/professor.js";
import { Router } from "express";

export const  professorRouter = Router();

professorRouter.post("/professors", async (req, res) => {
    const { nome, email, telefone } = req.body

    try {
        await Professor.create({ nome, email, telefone });
        res.json({message: "Professor Criado com Sucesso"});
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um erro ao adicionar Professor." });
    }
});

professorRouter.put("/professors/:id", async (req, res) => {
    const { nome, email, telefone } = req.body;

    try {
        const professor = await Professor.findByPk(req.params.id);
        if(professor) {
            await professor.update({ nome, email, telefone });
            res.json({ message: "Professor atualizado com SUCESSO"})
        } else {
            res.status(404).json({ message: "Professor não encontrado" });
        }
    } catch (error) {
        
    }
});

professorRouter.get("/professors", async (req, res) => {
    const listaProfessors = await Professor.findAll();
    res.json(listaProfessors);
});

professorRouter.get("/professors/:id", async (req, res) => {

    const professor = await Professor.findOne({ where: { id: req.params.id } });

    if(professor) {
        res.json(professor);
    } else {
        res.status(404).json({message: "professor não encontrado"});
    }
});

professorRouter.delete("/professors/:id", async (req, res) => {
    try {
      const professor = await Professor.findByPk(req.params.id);
      if (professor) {
        await professor.destroy();
        res.json({ message: "professor removido com sucesso" });
      } else {
        res.status(404).json({ message: "professor não encontrado." });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao excluir professor" });
    }
  });
