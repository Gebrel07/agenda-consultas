import { useState } from "react";
import { useAlertContext } from "../../hooks/useAlertContext";
import { useHorarios } from "../../hooks/useHorarios";

// componentes
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";

export default function ModalCancelar({ horario, onClose, onConfirm }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { updateIdCliente } = useHorarios();
  const { showAlert } = useAlertContext();

  const cancelarConsulta = () => {
    setIsPending(true);
    setError(null);

    updateIdCliente(horario.id, null)
      .then(() => {
        showAlert(`Horário cancelado: ${horario.dataString} - ${horario.hora}`, "alert-info");
        onConfirm();
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao cancelar a consulta");
        setIsPending(false);
      });
  };

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <Modal title="Cancelar consulta" onClose={onClose}>
      <h5>Atenção</h5>
      <p>Deseja realmente cancelar este horário?</p>
      <span>Data: {horario.dataString}</span> <br />
      <span>Hora: {horario.hora}</span>
      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary" onClick={cancelarConsulta}>
          Confirmar
        </button>
        <button className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
}
