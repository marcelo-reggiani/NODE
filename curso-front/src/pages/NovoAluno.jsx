import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addAluno } from "../api/alunos";
import toast from "react-hot-toast"

function NovoAluno() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  function salvarAluno(data) {
    addAluno(data).then((resposta) => {
      toast.success(resposta.message);
      navigate("/alunos");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  return (
    <main className="mt-4 container">
      <h1>Novo aluno</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarAluno)}>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", { required: true, maxLength: 200 })}
          />
          {errors.email && (
            <small className="text-danger">O email é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            className="form-control"
            {...register("telefone", { required: true, maxLength: 200 })}
          />
          {errors.telefone && (
            <small className="text-danger">O telefone é inválido!</small>
          )}
        </div>
        <div>
          <label htmlFor="responsavel">Responsavel</label>
          <input
            type="text"
            id="responsavel"
            className="form-control"
            {...register("responsavel", { required: true, maxLength: 200 })}
          />
          {errors.responsavel && (
            <small className="text-danger">O Responsavel é inválido!</small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoAluno;