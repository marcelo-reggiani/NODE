import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getProfessors } from "../api/professors";
import { useEffect, useState } from "react";
import { addCurso } from "../api/cursos";
import toast from "react-hot-toast"

function NovoCurso() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const [professors, setProfessors] = useState([]);

  function salvarCurso(data) {
    console.log("Dados enviados:", data); // Verifique o valor de professorId no INSPENCIONAR DO NAVEGADOR
    addCurso(data).then((resposta) => {
      toast.success(resposta.message);
      navigate("/cursos");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  function carregarProfessors() {
    getProfessors().then((data) => {
      setProfessors(data);
    });
  }

  useEffect(() => {
    carregarProfessors();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Novo curso</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarCurso)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 200 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="turno">Turno</label>
          <input
            type="text"
            id="turno"
            className="form-control"
            {...register("turno", { required: true, maxLength: 200 })}
          />
          {errors.turno && (
            <small className="text-danger">O Turno é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="dataNasc">Data Inicio</label>
          <input
            type="date"
            id="dataInicio"
            className="form-control"
            {...register("dataInicio")}
          />
          {errors.dataNasc && (
            <small className="text-danger">A data é inválida!</small>
          )}
        </div>
        <div>
          <label htmlFor="professorId">Professor</label>
          <select className="form-select" {...register("professorId", { required: true, valueAsNumber: true })}>
            <option value="">Selecione um Professor para o Curso</option>
            {professors.map((professor) => (
              <option key={professor.id} value={professor.id}>
                {professor.nome} - {professor.email}
              </option>
            ))}
          </select>
          {errors.professorId && (
            <small className="text-danger">Selecione um Professor</small>
          )}
        </div> 

        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoCurso;