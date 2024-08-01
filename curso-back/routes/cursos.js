import { Curso } from "../models/curso.js";
import { Router } from "express";

export const  cursosRouter = Router();


cursosRouter.post("/cursos", async (req, res) => {
    const { nome, turno, dataInicio } = req.body

    try {
        await Curso.create({ nome, turno, dataInicio });
        res.json({message: "curso Criado com Sucesso"});
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um erro ao adicionar curso." });
    }
});


cursosRouter.put("/cursos/:id", async (req, res) => {
    const { nome, turno, dataInicio } = req.body;

    try {
        const curso = await Curso.findByPk(req.params.id);
        if(curso) {
            await curso.update({ nome, turno, dataInicio });
            res.json({ message: "curso atualizado com SUCESSO"})
        } else {
            res.status(404).json({ message: "curso não encontrado" });
        }
    } catch (error) {
        
    }
});


cursosRouter.get("/cursos", async (req, res) => {
    const listacursos = await Curso.findAll();
    res.json(listacursos);
});

cursosRouter.get("/cursos/:id", async (req, res) => {

    const curso = await Curso.findOne({ where: { id: req.params.id } });

    if(curso) {
        res.json(curso);
    } else {
        res.status(404).json({message: "curso não encontrado"});
    }
});

cursosRouter.delete("/cursos/:id", async (req, res) => {
    try {
      const curso = await Curso.findByPk(req.params.id);
      if (curso) {
        await curso.destroy();
        res.json({ message: "curso removido com sucesso" });
      } else {
        res.status(404).json({ message: "curso não encontrado." });
      }
    } catch (err) {
      res.status(500).json({ message: "Ocorreu um erro ao excluir curso" });
    }
  });


//   CURSO PRINCIPAL
// delete curso deleta aluno e professor
// quando listar curso include professor
// adicionar e editar curso tem que adicionar professor
// listar aluno vai listar curso