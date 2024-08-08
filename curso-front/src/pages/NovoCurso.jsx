import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addCurso } from "../api/cursos";
import toast from "react-hot-toast"

function NovoCurso() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  function salvarCurso(data) {
    addCurso(data).then((resposta) => {
      // 'resposta' representa o corpo que o back end retornou para o front com msg de sucesso
      toast.success(resposta.message);
      navigate("/cursos");
    }).catch((err) => {
      // Caso ocorra algum erro usamos o catch para tratar
      toast.error(err.response.data.message);
    });
  }

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
        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoCurso;