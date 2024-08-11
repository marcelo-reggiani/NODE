import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteProfessor, getProfessors } from "../api/professors";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";


function Professors() {
  const [professors, setProfessors] = useState(null);

  function carregarProfessors() {
    getProfessors().then((dados) => {
      setProfessors(dados);
    });
  }

  function deletarProfessor(id) {
    const deletar = confirm("Tem certeza que deseja excluir?");
    if(deletar){
      deleteProfessor(id).then((resposta) => {
        toast.success(resposta.message);
        carregarProfessors();
      });
    }
  }

  useEffect(() => {
    carregarProfessors();
  }, []);


  return (
    <main className="mt-4 container">
      <h1>Professores</h1>
      <Button as={Link} to="/professors/novo">
        Adicionar Professor
      </Button>
      <hr />
      {professors ? <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {professors.map((professor) => {
            return (
              <tr key={professor.id}>
                <td>{professor.nome}</td>
                <td>{professor.email}</td>
                <td>{professor.telefone}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => deletarProfessor(professor.id)}>Excluir</Button>
                  <Button size="sm" as={Link} to={`/professors/editar/${professor.id}`}>Editar</Button>
                </td>
              </tr>
            );
          })};
        </tbody>
      </Table>: <Loader />}
    </main>
  );
}

export default Professors;