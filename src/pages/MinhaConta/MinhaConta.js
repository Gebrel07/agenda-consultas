import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthcontext";

//styles
import styles from "./MinhaConta.module.css";

// assets
import person from "../../assets/person.svg";

// components
import Modal from "../../components/Modal";
import FormEmail from "./FormEmail";
import FormImg from "./FormImg";
import FormNome from "./FormNome";
import FormSenha from "./FormSenha";

export default function MinhaConta() {
  const { user } = useAuthContext();
  const [CurrentForm, setCurrentForm] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const onClose = () => {
    setCurrentForm(null);
    setModalTitle("");
  };

  return (
    <>
      {CurrentForm && (
        <Modal title={modalTitle} onClose={onClose}>
          {CurrentForm}
        </Modal>
      )}
      <div className="d-flex justify-content-center mb-3">
        <div
          className={`${styles["img-container"]} border shadow`}
          onClick={() => {
            setCurrentForm(<FormImg onClose={onClose} />);
            setModalTitle("Alterar Imagem de Usuário");
          }}>
          <img
            width="100%"
            height="100%"
            src={user.photoURL ? user.photoURL : person}
            onError={(e) => {
              // evitar loops
              e.target.onerror = null;
              e.target.src = person;
            }}
            alt="Imagem Perfil"
          />
        </div>
      </div>
      <div className="d-flex flex-column gap-3 p-4 border rounded shadow">
        <div className="d-flex justify-content-between align-items-center">
          <span>Nome: {user.displayName}</span>
          <button
            className="btn"
            onClick={() => {
              setCurrentForm(<FormNome onClose={onClose} />);
              setModalTitle("Alterar Nome de Usuário");
            }}>
            <span className="material-symbols-outlined text-primary align-middle">edit</span>
          </button>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>Email: {user.email}</span>
          <button
            className="btn"
            onClick={() => {
              setCurrentForm(<FormEmail onClose={onClose} />);
              setModalTitle("Alterar Email de Usuário");
            }}>
            <span className="material-symbols-outlined text-primary align-middle">edit</span>
          </button>
        </div>
        <button
          className="btn text-primary"
          onClick={() => {
            setCurrentForm(<FormSenha onClose={onClose} />);
            setModalTitle("Alterar Senha do Usuário");
          }}>
          Alterar Senha
        </button>
      </div>
    </>
  );
}
