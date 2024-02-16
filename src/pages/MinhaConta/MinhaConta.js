import person from "../../assets/person.svg";
import { useAuthContext } from "../../hooks/useAuthcontext";
import styles from "./MinhaConta.module.css";

export default function MinhaConta() {
  const { user } = useAuthContext();

  return (
    <>
      <div className="d-flex justify-content-center mb-3">
        <div className={`${styles["img-container"]} border rounded position-relative shadow`}>
          <img width="100%" src={user.photoURL ? user.photoURL : person} alt="Imagem Perfil" />
          <div className="position-absolute top-0 end-0 mt-2 me-2">
            <span className="material-symbols-outlined text-primary align-middle">edit</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column gap-3 p-4 border rounded shadow">
        <div className="d-flex justify-content-between align-items-center">
          <span>Nome: {user.displayName}</span>
          <button className="btn">
            <span className="material-symbols-outlined text-primary align-middle">edit</span>
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>Email: {user.email}</span>
          <button className="btn">
            <span className="material-symbols-outlined text-primary align-middle">edit</span>
          </button>
        </div>
        <button className="btn text-primary">Alterar Senha</button>
      </div>
    </>
  );
}
