import { useAgenda } from "../../hooks/useAgenda";

// estilos
import styles from "./Horarios.module.css";

// assets
import { useEffect, useState } from "react";
import userDoctor from "../../assets/user-doctor.svg";

// componentes
import Spinner from "../../components/Spinner";

export default function ListaProfs({ dataSel }) {
  // TODO: adicionar modal para confirmar agendamento
  // TODO: exibir alerta de sucesso ao agendar horario
  // TODO: ao agendar, redirecionar para minha agenda
  const [agenda, setAgenda] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { getAgenda } = useAgenda();

  useEffect(() => {
    if (dataSel) {
      setIsPending(true);
      setError(null);
      getAgenda(dataSel)
        .then((res) => {
          setAgenda(res);
          setIsPending(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Erro ao carregar agenda");
          setIsPending(false);
        });
    }
    // eslint-disable-next-line
  }, [dataSel]);

  if (isPending) {
    return (
      <div style={{ marginTop: "15vh" }}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (agenda) {
    return (
      <div className="d-flex flex-column gap-4 mt-2">
        {agenda.map((prof) => (
          <div key={prof.id} className="border rounded shadow">
            <div className={`${styles["card-prof"]} border p-3`}>
              <div className="d-flex justify-content-center">
                <div className={`${styles["foto-prof"]} text-center p-3 border rounded`}>
                  <img src={userDoctor} alt="Foto Profissional" />
                </div>
              </div>
              <div className={`${styles["infos-prof"]} p-3`}>
                <span className="fw-bold">{prof.nome}</span> <br />
                <span>{prof.registro}</span> <br />
                <span>Sexo: {prof.sexo}</span>
              </div>
            </div>
            <div className="d-flex justify-content-start flex-wrap gap-3 p-3">
              {prof.horarios.map((horario) => (
                <button
                  key={horario.id}
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => console.log(horario.id)}>
                  {horario.hora}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
