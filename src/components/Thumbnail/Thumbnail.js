import person from "../../assets/person.svg";
import styles from "./Thumbnail.module.css";

export default function Thumbnail({ src }) {
  return (
    <div className={`${styles.container} border shadow`}>
      <img
        width="100%"
        height="100%"
        src={src ? src : person}
        onError={(e) => {
          // evitar loops
          e.target.onerror = null;
          e.target.src = person;
        }}
        alt="Imagem Usuário"
      />
    </div>
  );
}
