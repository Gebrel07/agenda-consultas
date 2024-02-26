import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthcontext";

// estilos
import "./NavBar.css";

export default function Navbar() {
  const { user } = useAuthContext();

  const openMenu = () => {
    document.getElementById("menu").classList.add("show");
  };

  return (
    <nav className="d-flex align-items-center">
      <Link to={user ? "/home" : "/"} className="fw-bold">
        App Consultas
      </Link>
      <div className="ms-auto">
        {!user && <Link to="/login">Login</Link>}
        {user && (
          <button className="btn py-0" onClick={openMenu}>
            <span className="material-symbols-outlined align-middle">menu</span>
          </button>
        )}
      </div>
    </nav>
  );
}
