import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cursos from "./pages/Cursos";
import NovoCurso from "./pages/NovoCurso";
import EditarCurso from "./pages/EditarCurso";
import Alunos from "./pages/Alunos";
import NovoAluno from "./pages/NovoAluno";
import EditarAluno from "./pages/EditarAluno";
import Professors from "./pages/Professors";
import NovoProfessor from "./pages/NovoProfessor";
import EditarProfessor from "./pages/EditarProfessor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/novo" element={<NovoCurso />} />
          <Route path="/cursos/editar/:id" element={<EditarCurso />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/alunos/novo" element={<NovoAluno />} />
          <Route path="/alunos/editar/:id" element={<EditarAluno />} />
          <Route path="/professors" element={<Professors />} />
          <Route path="/professors/novo" element={<NovoProfessor />} />
          <Route path="/professors/editar/:id" element={<EditarProfessor />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
