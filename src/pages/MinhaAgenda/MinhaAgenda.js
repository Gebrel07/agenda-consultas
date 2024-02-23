import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthcontext";
import { useMinhaAgenda } from "../../hooks/useMinhaAgenda";

// assets
import doctorIcon from "../../assets/user-doctor.svg";

// componentes
import Spinner from "../../components/Spinner";
import ModalCancelar from "./ModalCancelar";

export default function MinhaAgenda() {
  const { user } = useAuthContext();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const [horarios, setHorarios] = useState(null);
  const [horarioCancelar, setHorarioCancelar] = useState(null);

  const { getMinhaAgenda } = useMinhaAgenda();

  const hoje = new Date();

  const horarioFuturo = (timestamp) => {
    return timestamp.toDate() > hoje;
  };

  const fetchAgenda = () => {
    setIsPending(true);
    setError(null);
    getMinhaAgenda(user.uid)
      .then((res) => {
        setHorarios(res);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar agenda");
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  useEffect(() => {
    fetchAgenda();
    // eslint-disable-next-line
  }, []);

  const onClose = () => {
    setHorarioCancelar(null);
  };

  const onConfirm = () => {
    fetchAgenda();
    setHorarioCancelar(null);
  };

  if (isPending) {
    return (
      <div style={{ marginTop: "15%" }}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!horarios || !horarios.length) {
    return (
      <>
        <h3>Minha Agenda</h3>
        <p>Nenhum horário agendado</p>
      </>
    );
  }

  return (
    <>
      {horarioCancelar && (
        <ModalCancelar horario={horarioCancelar} onClose={onClose} onConfirm={onConfirm} />
      )}

      <h3>Minha Agenda</h3>
      {horarios.map((horario) => (
        <div
          key={horario.id}
          className="d-flex justify-content-between mb-3 p-2 border 
          border-secondary rounded align-items-center">
          <div>
            <div className="d-flex">
              <div>
                <img
                  className="border border-secondary rounded me-2"
                  src={horario.prof.img ? horario.prof.img : doctorIcon}
                  onError={(e) => {
                    e.target.onerror = null; // evitar loops
                    e.target.src = doctorIcon; // fallback img
                  }}
                  width="60px"
                  height="100%"
                  alt="Imagem profissional"
                />
              </div>
              <div>
                <span className="fw-bold">{horario.prof.nome}</span> <br />
                <span>{horario.prof.registro}</span> <br />
                <span>Sexo: {horario.prof.sexo}</span>
              </div>
            </div>
            <div className="mt-2">
              <span>Data: {horario.dataString}</span> <br />
              <span>Hora: {horario.hora}</span>
            </div>
          </div>
          {horarioFuturo(horario.dataHora) && (
            <button className="btn btn-primary" onClick={() => setHorarioCancelar(horario)}>
              Cancelar
            </button>
          )}
        </div>
      ))}
    </>
  );
}
