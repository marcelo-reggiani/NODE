import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteCurso, getCursos } from "../api/cursos";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";


function Cursos() {
  const [cursos, setCursos] = useState(null);
  const navigate = useNavigate();

  function carregarCursos() {
    getCursos().then((dados) => {
      setCursos(dados);
    }).catch((err) => {
      toast.error("Erro ao carregar cursos.");
      navigate("/cursos");
    });
  }

  function deletarCurso(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if(deletar){
      deleteCurso(id).then((resposta) => {
        toast.success(resposta.message);
        carregarCursos();
      }).catch((err) => {
        toast.error("Erro ao excluir curso.");
      });
    }
  }

  useEffect(() => {
    carregarCursos();
  }, []);


  return (
    <main className="mt-4 container">
      <h1>Cursos</h1>
      <Button as={Link} to="/cursos/novo">
        Adicionar Curso
      </Button>
      <hr />
      {cursos ? <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Turno</th>
            <th>Data Inicio</th>
            <th>Professor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => {
            return (
              <tr key={curso.id}>
                <td>{curso.nome}</td>
                <td>{curso.turno}</td>
                <td>{curso.dataInicio  ? new Date(curso.dataInicio+"T00:00:00").toLocaleDateString() : "-"}</td>
                <td>{curso.professor?.nome || "-"}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => deletarCurso(curso.id)}>Excluir</Button>
                  <Button size="sm" as={Link} to={`/cursos/editar/${curso.id}`}>Editar</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>: <Loader />}
    </main>
  );
}
export default Cursos;