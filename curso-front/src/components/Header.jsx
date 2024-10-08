import logo from "./../assets/soul-pet-logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header w-100 px-3 py-2">
      <nav className="container d-flex justify-content-between align-items-center">
        <Link to="/">
          <img src={logo} alt="SoulCurso" />
        </Link>
        <div className="d-flex gap-5">
          <Link to="/cursos">Cursos</Link>
          <Link to="/alunos">Alunos</Link>
          <Link to="/professors">Professor</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
