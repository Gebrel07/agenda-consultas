import { NavLink } from "react-router-dom";
import "./Menu.css"

export default function MenuLink({ to, text, iconName, onClick }) {
  return (
    <NavLink to={to} onClick={onClick}>
      <span className="material-symbols-outlined align-middle me-2">{iconName}</span>
      {text}
    </NavLink>
  );
}
