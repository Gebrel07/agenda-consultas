import { projectFirestore } from "../firebase/config";

export const useHorarios = () => {
  const ref = projectFirestore.collection("horarios");

  const getHorarios = async (dataConsulta, apenasDisponivel = true) => {
    let query = ref.orderBy("dataHora", "asc").where("dataHora", ">=", dataConsulta);
    if (apenasDisponivel) {
      query = query.where("idCliente", "==", null);
    }
    query = await query.get();
    const res = [];
    query.docs.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
    return res;
  };

  const updateIdCliente = async (idHorario, idCliente) => {
    const resp = await ref.doc(idHorario).update({ idCliente });
    return resp;
  };

  return { getHorarios, updateIdCliente };
};
