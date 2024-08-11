import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getCurso, updateCurso } from "../api/cursos";
import { getProfessors } from "../api/professors";

function EditarCurso() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  const [professors, setProfessors] = useState([]);

  function atualizarCurso(data) {
    console.log("Dados atualizados:", data); // Verifique o valor de professorId no INSPENCIONAR DO NAVEGADOR
    updateCurso(id, data).then((resposta) => {
      toast.success(resposta.message);
      navigate("/cursos");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  function carregarCurso() {
    getCurso(id).then((dados) => {
      reset(dados);
    }).catch((err) => {
      navigate("/cursos");
    });
  }

  useEffect(() => {
    carregarCurso();
  }, []);

  function carregarProfessores() {
    getProfessors().then((data) => {
      setProfessors(data);
    }).catch((err) => {
      toast.error("Erro ao carregar professores.");
    });
  }

  useEffect(() => {
    carregarProfessores();
  }, []);

  return (
    <main className="mt-4 container">
      <h1>Editar curso</h1>
      <hr />
      <form onSubmit={handleSubmit(atualizarCurso)}>
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
          {errors.nome && (
            <small className="text-danger">O turno é inválido!</small>
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
            <option value="">Selecione um Professor</option>
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
          Atualizar
        </Button>
      </form>
    </main>
  );
}

export default EditarCurso;