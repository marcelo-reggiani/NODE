import { Aluno } from "../models/aluno.js";
import { Router } from "express";

export const  alunosRouter = Router();


alunosRouter.post("/alunos", async (req, res) => {
    const { nome, email, telefone, responsavel } = req.body

    try {
        await Aluno.create({ nome, email, telefone, responsavel });
        res.json({message: "aluno Criado com Sucesso"});
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um erro ao adicionar aluno." });
    }
});


alunosRouter.put("/alunos/:id", async (req, res) => {
    const { nome, email, telefone, responsavel } = req.body;

    try {
        const aluno = await Aluno.findByPk(req.params.id);
        if(aluno) {
            await aluno.update({ nome, email, telefone, responsavel });
            res.json({ message: "aluno atualizado com SUCESSO"})
        } else {
            res.status(404).json({ message: "aluno não encontrado" });
        }
    } catch (error) {
        
    }
});


alunosRouter.get("/alunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll();
    res.json(listaAlunos);
});

alunosRouter.get("/alunos/:id", async (req, res) => {

    const aluno = await Aluno.findOne({ where: { id: req.params.id } });

    if(aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({message: "aluno não encontrado"});
    }
});

alunosRouter.delete("/alunos/:id", async (req, res) => {
    try {
      const aluno = await Aluno.findByPk(req.params.id);
      if (aluno) {
        await aluno.destroy();
        res.json({ message: "aluno removido com sucesso" });
      } else {
        res.status(404).json({ message: "aluno não encontrado." });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao excluir aluno" });
    }
  });
