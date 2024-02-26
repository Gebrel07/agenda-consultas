import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthcontext";
import { useLogout } from "../../hooks/useLogout";

// estilos
import "./Menu.css";

// componentes
import Thumbnail from "../Thumbnail/Thumbnail";
import MenuLink from "./MenuLink";

export default function Menu() {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const onClose = () => {
    document.getElementById("menu").classList.remove("show");
  };

  return (
    <div id="menu" className="bg-light border shadow">
      {/* fechar menu */}
      <div className="text-end">
        <button className="btn p-0 " onClick={onClose}>
          <span className="material-symbols-outlined align-middle">close</span>
        </button>
      </div>

      {/* infos usuario */}
      <div className="my-4">
        <div id="thumbnail">
          <div id="img-container">
            <Thumbnail src={user.photoURL} />
          </div>
        </div>
        <div className="text-center">
          <span>{user.displayName}</span>
        </div>
      </div>

      {/* links */}
      <ul>
        <li>
          <MenuLink to="/home" text="Home" iconName="home" onClick={onClose} />
        </li>
        <li>
          <MenuLink to="/horarios" text="Agendar" iconName="calendar_month" onClick={onClose} />
        </li>
        <li>
          <MenuLink
            to="/minha-agenda"
            text="Minha Agenda"
            iconName="calendar_clock"
            onClick={onClose}
          />
        </li>
        <li>
          <MenuLink to="/minha-conta" text="Minha Conta" iconName="person" onClick={onClose} />
        </li>
        <li>
          <Link onClick={logout}>
            <span className="material-symbols-outlined align-middle me-2">logout</span>
            Sair
          </Link>
        </li>
      </ul>
    </div>
  );
}
