import { useState } from "react";
import { useNavigate } from "react-router-dom";

// componentes
import Modal from "../../components/Modal";

// custom hooks
import { useAlertContext } from "../../hooks/useAlertContext";
import { useAuthContext } from "../../hooks/useAuthcontext";
import { useHorarios } from "../../hooks/useHorarios";

export default function ModalAgendarHorario({ onClose, horarioSel }) {
  const navigate = useNavigate();

  const { showAlert } = useAlertContext();
  const { user } = useAuthContext();

  const { updateIdCliente } = useHorarios();

  const [error, setError] = useState(null);

  const handleClick = () => {
    // reservar horario e redirecionar para minha-agenda
    updateIdCliente(horarioSel.id, user.uid)
      .then(() => {
        showAlert("Horário agendado com sucesso!", "alert-success");
        navigate("/minha-agenda");
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao agendar horario");
      });
  };

  return (
    <Modal title="Agendar Horário" onClose={onClose}>
      <h5>Deseja agendar este horário?</h5>
      <span className="fw-bold">Horario</span> <br />
      <span>Data: {horarioSel.dataString}</span> <br />
      <span>Hora: {horarioSel.hora}</span> <br />
      <div className="mt-3">
        <span className="fw-bold">Profissional</span> <br />
        <span>Nome: {horarioSel.prof.nome}</span> <br />
        <span>Regsitro: {horarioSel.prof.registro}</span> <br />
        <span>Sexo: {horarioSel.prof.sexo}</span> <br />
      </div>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary" onClick={handleClick}>
          Confirmar
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
      </div>
      {error && <p className="mt-3 text-danger">{error}</p>}
    </Modal>
  );
}
