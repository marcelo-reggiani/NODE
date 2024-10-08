import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addProfessor } from "../api/professors";
import toast from "react-hot-toast"

function NovoProfessor() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  function salvarProfessor(data) {
    addProfessor(data).then((resposta) => {
      toast.success(resposta.message);
      navigate("/professors");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  return (
    <main className="mt-4 container">
      <h1>Novo Professor</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarProfessor)}>
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

        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoProfessor;