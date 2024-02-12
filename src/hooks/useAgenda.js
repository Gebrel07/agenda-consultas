import { useState } from "react";
import { useHorarios } from "./useHorarios";
import { useProfissionais } from "./useProfissionais";

export const useAgenda = () => {
  const [isPending, setIsPending] = useState(false);
  const [agenda, setAgenda] = useState([]);

  const { getHorarios } = useHorarios();
  const { getProfissionais } = useProfissionais();

  const getAgenda = async (queryHorarios) => {
    setIsPending(true);
    const horarios = await getHorarios(queryHorarios);
    const profs = await getProfissionais();
    if (horarios && profs) {
      setAgenda(tratarDados(horarios, profs));
    }
    setIsPending(false);
  };

  const parseDate = (dataHora) => {
    const opts = { day: "numeric", month: "short" };
    return dataHora.toDate().toLocaleString("pt-BR", opts);
  };

  const parseHour = (dataHora) => {
    const opts = { hour: "numeric", minute: "numeric" };
    return dataHora.toDate().toLocaleString("pt-BR", opts);
  };

  const tratarDados = (horarios, profissionais) => {
    const res = [];
    // encontrar profissional de id correspondente
    horarios.forEach((horario) => {
      const prof = profissionais.find((p) => {
        return p.id === horario.idProf;
      });
      // inserir horario  + profissional na lista
      res.push({
        ...horario,
        prof,
        data: parseDate(horario.dataHora),
        hora: parseHour(horario.dataHora),
      });
    });
    return res;
  };

  return { getAgenda, isPending, agenda };
};
