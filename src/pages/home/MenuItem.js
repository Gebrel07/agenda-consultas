import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

export default function MenuItem({ endpoint, title, icon }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles["icon"]} onClick={() => navigate(endpoint)}>
        <img src={icon} alt={title} />
      </div>
      <div className={styles["title"]}>
        <span>{title}</span>
      </div>
    </div>
  );
}
