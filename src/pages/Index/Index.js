import { useNavigate } from "react-router-dom";

// estilos
import styles from "./Index.module.css";

// assets
import agenda from "../../assets/agenda.jpg";
import github from "../../assets/github.png";
import linkedin from "../../assets/linkedin.png";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div id={styles.root}>
      <div id={styles.hero}>
        <img src={agenda} width="100%" height="400px" alt="Banner" />
        <div id={styles["hero-container"]} className="p-5">
          <h3>Agende suas consultas online</h3>
          <div className="text-end mt-auto">
            <button className="btn btn-primary" onClick={() => navigate("/login")}>
              Agendar
            </button>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3>Sobre</h3>
        <p>
          Esta aplicação é uma demontração de agendamento online de consultas. Clique acima em
          "Agendar" e crie sua conta para ver como ela funciona na prática.
        </p>
        <p>A aplicação foi contruída usando ReactJS + Firebase.</p>
        <p>
          <a href="https://github.com/Gebrel07/agenda-consultas" target="blank">
            Clique aqui
          </a>{" "}
          para ver o código fonte.
        </p>
      </div>
      <div className="bg-secondary p-5">
        <h3 className="text-light mb-4">Funções</h3>
        <div className="d-flex justify-content-center flex-wrap gap-5 text-light">
          <div className="text-center">
            <span
              className="material-symbols-outlined align-middle mb-4"
              style={{ fontSize: "80px" }}>
              calendar_month
            </span>
            <h5>Agendar Consultas</h5>
          </div>
          <div className="text-center">
            <span
              className="material-symbols-outlined align-middle mb-4"
              style={{ fontSize: "80px" }}>
              calendar_clock
            </span>
            <h5>Gerenciar Minha Agenda</h5>
          </div>
          <div className="text-center">
            <span
              className="material-symbols-outlined align-middle mb-4"
              style={{ fontSize: "80px" }}>
              person
            </span>
            <h5>Gerenciar Minha Conta</h5>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3>Contato</h3>
        <div className="d-flex justify-content-center flex-wrap gap-5 mt-3">
          <a href="https://www.linkedin.com/in/gabrielsantosm/" target="blank">
            <img className="me-2" src={linkedin} width="20px" alt="Logo LinkedIn" />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/Gebrel07" target="blank">
            <img className="me-2" src={github} width="20px" alt="Logo github" /> <span>Github</span>
          </a>
        </div>
      </div>
    </div>
  );
}
