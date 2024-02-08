import { Link } from "react-router-dom";
import "./NavBar.css";

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="brand">
        App Consultas
      </Link>
      <Link to="/profissionais/criar">Criar Profissional</Link>
    </nav>
  );
}
