import { useNavigate } from "react-router-dom";
import trashCan from "../../assets/trash-can.svg";
import doctorIcon from "../../assets/user-doctor.svg";

export default function InfosGerais({ profissional }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm("Deletar este profissional?")) {
      window.alert("Deletado com sucesso!");
      navigate("/");
    }
  };

  return (
    <div>
      <div className="d-flex">
        <div className="border border-secondary rounded me-2">
          <img src={doctorIcon} width="100px" alt="Imagem profissional"/>
        </div>
        <div>
          <p>
            Nome: <b>{profissional.nome}</b>
          </p>
          <p>Registro: {profissional.registro}</p>
        </div>
      </div>
      <div className="d-flex mt-2 justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate.push(`/profissionais/${profissional.id}/editar`);
          }}>
          Editar
        </button>
        <button className="btn" onClick={handleDelete}>
          <img className="delete" src={trashCan} alt="Icone deletar" />
          <span>Excluir</span>
        </button>
      </div>
    </div>
  );
}
