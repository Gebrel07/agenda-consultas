import { useEffect } from "react";
import { useAlertContext } from "../../hooks/useAlertContext";
import { useAuthContext } from "../../hooks/useAuthcontext";
import { useHorarios } from "../../hooks/useHorarios";
import { useMinhaAgenda } from "../../hooks/useMinhaAgenda";

// components
import Spinner from "../../components/Spinner";
import ListaHorarios from "./ListaHorarios";

export default function MinhaAgenda() {
  const { user } = useAuthContext();
  const { showAlert } = useAlertContext();
  const { getMeusHorarios, isPending, minhaAgenda } = useMinhaAgenda();
  const { updateIdCliente } = useHorarios();

  useEffect(() => {
    getMeusHorarios(user.uid);
    // eslint-disable-next-line
  }, []);

  const cancelarConsulta = async (idHorario) => {
    // limpar idCliente
    await updateIdCliente(idHorario, null);
    // emitir mensagem
    const horario = minhaAgenda.find((hr) => {
      return hr.id === idHorario;
    });
    showAlert(`Horário cancelado: ${horario.data} - ${horario.hora}`, "alert-info");
    // recarregar horarios
    await getMeusHorarios(user.uid);
  };

  return (
    <div>
      <h3>Minha Agenda</h3>
      {isPending && <Spinner />}
      {!isPending && (
        <>
          {minhaAgenda.length ? (
            <ListaHorarios horarios={minhaAgenda} cancelarCallback={cancelarConsulta} />
          ) : (
            <p>Nenhum horário agendado</p>
          )}
        </>
      )}
    </div>
  );
}
