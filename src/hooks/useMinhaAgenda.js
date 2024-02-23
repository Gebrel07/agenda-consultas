import { fieldPath, projectFirestore } from "../firebase/config";

export const useMinhaAgenda = () => {
  const getMinhaAgenda = async (idUsuario) => {
    const horarios = await getHorarios(idUsuario);
    if (!horarios.length) {
      return null;
    }
    const idProfs = getIdProfs(horarios);
    const profs = await getProfissionais(idProfs);
    return juntarQueries(horarios, profs);
  };

  const getHorarios = async (idUsuario) => {
    // buscar horarios reservados pelo usuario passado
    const res = [];
    try {
      const query = await projectFirestore
        .collection("horarios")
        .where("idCliente", "==", idUsuario)
        .orderBy("dataHora", "desc")
        .get();
      query.docs.forEach((doc) => {
        const horario = { ...doc.data(), id: doc.id };
        setDataString(horario);
        setHora(horario);
        res.push(horario);
      });
    } catch (err) {
      console.error(err);
    } finally {
      return res;
    }
  };

  const setHora = (horario) => {
    // inserir string de hora
    const local = "pt-BR";
    const opts = { hour: "numeric", minute: "numeric" };
    const data = horario.dataHora.toDate();
    horario.hora = data.toLocaleTimeString(local, opts);
  };

  const setDataString = (horario) => {
    // inserir string de data (formato longo)
    const local = "pt-BR";
    const opts = { day: "numeric", month: "long", year: "numeric" };
    const data = horario.dataHora.toDate();
    horario.dataString = data.toLocaleDateString(local, opts);
  };

  const getIdProfs = (horarios) => {
    // listar ids dos profissionais inclusos na lista de horarios
    const res = [];
    horarios.forEach((hr) => {
      res.push(hr.idProf);
    });
    return res;
  };

  const getProfissionais = async (idsProfs) => {
    // buscar profissionais de acordo com a lista de ids passada
    const res = [];
    try {
      const query = await projectFirestore
        .collection("profissionais")
        .where(fieldPath.documentId(), "in", idsProfs)
        .get();
      query.docs.forEach((doc) => {
        res.push({ ...doc.data(), id: doc.id });
      });
    } catch (err) {
      console.error(err);
    } finally {
      return res;
    }
  };

  const juntarQueries = (horarios, profissionais) => {
    const res = [];
    // encontrar profissional de cada horario
    horarios.forEach((horario) => {
      const prof = profissionais.find((p) => {
        return p.id === horario.idProf;
      });
      // inserir horario  + profissional na lista
      res.push({ ...horario, prof });
    });
    return res;
  };

  return { getMinhaAgenda };
};
