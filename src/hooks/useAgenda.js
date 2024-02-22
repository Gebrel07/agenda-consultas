import { fieldPath, projectFirestore } from "../firebase/config";

export const useAgenda = () => {
  const getAgenda = async (data) => {
    const horarios = await getHorarios(data);
    if (!horarios.length) {
      return null;
    }
    const idProfs = getIdProfs(horarios);
    const profs = await getProfs(idProfs);
    return joinQueries(profs, horarios);
  };

  const getHorarios = async (data) => {
    const proxDia = new Date(data.getTime());
    proxDia.setDate(proxDia.getDate() + 1);
    const res = [];
    try {
      const query = await projectFirestore
        .collection("horarios")
        .where("dataHora", ">=", data)
        .where("dataHora", "<", proxDia)
        .where("idCliente", "==", null)
        .orderBy("dataHora", "asc")
        .get();
      query.docs.forEach((doc) => {
        const horario = { ...doc.data(), id: doc.id };
        setHora(horario); // inserir hora formatada da consulta
        res.push(horario);
      });
    } catch (err) {
      console.error(err);
    }
    return res;
  };

  const setHora = (horario) => {
    const local = "pt-BR";
    const opts = { hour: "numeric", minute: "numeric" };
    const data = horario.dataHora.toDate();
    horario.hora = data.toLocaleTimeString(local, opts);
  };

  const getIdProfs = (horarios) => {
    const res = [];
    horarios.forEach((hr) => {
      res.push(hr.idProf);
    });
    return res;
  };

  const getProfs = async (idProfs) => {
    const res = [];
    try {
      const query = await projectFirestore
        .collection("profissionais")
        .where(fieldPath.documentId(), "in", idProfs)
        .get();
      query.docs.forEach((doc) => {
        res.push({ ...doc.data(), id: doc.id });
      });
    } catch (err) {
      console.error(err);
    }
    return res;
  };

  const joinQueries = (profs, horarios) => {
    const res = [];
    profs.forEach((prof) => {
      // buscar horarios do profissional
      const horariosProf = horarios.filter((hr) => {
        return hr.idProf === prof.id;
      });
      res.push({ ...prof, horarios: horariosProf });
    });
    return res;
  };

  return { getAgenda };
};
