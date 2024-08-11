import { Curso } from "../models/curso.js";
import { Professor } from "../models/professor.js";
import { Router } from "express";

export const  cursosRouter = Router();

cursosRouter.post("/cursos", async (req, res) => {
    const { nome, turno, dataInicio, professorId } = req.body;

    try {
        await Curso.create({ nome, turno, dataInicio, professorId });
        res.json({ message: "Curso criado com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ocorreu um erro ao adicionar o curso." });
    }
});

cursosRouter.put("/cursos/:id", async (req, res) => {
    const { nome, turno, dataInicio, professorId } = req.body;

    try {
        const curso = await Curso.findByPk(req.params.id);

        if(curso) {
            await curso.update({ nome, turno, dataInicio, professorId });
            res.json({ message: "Curso atualizado com sucesso" });
        } else {
            res.status(404).json({ message: "Curso não encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar curso" });
    }
});

cursosRouter.get("/cursos", async (req, res) => {
    const listacursos = await Curso.findAll({ include: [Professor] });
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
