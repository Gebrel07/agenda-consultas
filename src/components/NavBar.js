import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthcontext";
import { useLogout } from "../hooks/useLogout";
import "./NavBar.css";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className="d-flex align-items-center">
      <Link to="/home" className="fw-bold">
        App Consultas
      </Link>
      <div className="ms-auto">
        {!user && <Link to="/login">Login</Link>}
        {user && (
          <>
            <span className="me-3">Olá, {user.displayName}</span>
            <button className="btn btn-secondary" onClick={logout}>
              Sair
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
