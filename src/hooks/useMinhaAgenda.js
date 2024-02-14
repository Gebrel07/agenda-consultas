import { useState } from "react";
import { fieldPath, projectFirestore } from "../firebase/config";
import { useQuery } from "./useQuery";

export const useMinhaAgenda = () => {
  const { getDocsFromQuery, timestampToDateString, timestampToHourString } = useQuery();
  const [minhaAgenda, setMinhaAgenda] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const getHorarios = async (idUsuario) => {
    const queryHorarios = await projectFirestore
      .collection("horarios")
      .where("idCliente", "==", idUsuario)
      .orderBy("dataHora", "asc")
      .get();
    return getDocsFromQuery(queryHorarios);
  };

  const getProfissionais = async (idsProfs) => {
    const queryProfissionais = await projectFirestore
      .collection("profissionais")
      .where(fieldPath.documentId(), "in", idsProfs)
      .get();
    return getDocsFromQuery(queryProfissionais);
  };

  const juntarQueries = (horarios, profissionais) => {
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
        data: timestampToDateString(horario.dataHora),
        hora: timestampToHourString(horario.dataHora),
      });
    });
    return res;
  };

  const getMeusHorarios = async (idUsuario) => {
    setIsPending(true);

    const horarios = await getHorarios(idUsuario);

    if (!horarios.length) {
      setIsPending(false);
      setMinhaAgenda([]);
      return null;
    }

    const idsProfs = horarios.map((hr) => {
      return hr.idProf;
    });
    const profissionais = await getProfissionais(idsProfs);

    if (!profissionais.length) {
      setIsPending(false);
      setMinhaAgenda([]);
      return null;
    }

    const res = juntarQueries(horarios, profissionais);

    setMinhaAgenda(res);
    setIsPending(false);
  };
  return { getMeusHorarios, isPending, minhaAgenda };
};
