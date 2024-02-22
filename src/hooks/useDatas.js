import { projectFirestore } from "../firebase/config";

export const useDatas = () => {
  const getDatas = async () => {
    const timestamps = await getTimestamps();
    if (!timestamps.length) {
      return null;
    }
    const dateStrings = getDateStrings(timestamps);
    return getDateOpts(dateStrings);
  };

  const getTimestamps = async () => {
    const timestamps = [];
    try {
      // query de horarios a partir da hora atual
      const query = await projectFirestore
        .collection("horarios")
        .where("dataHora", ">=", new Date())
        .where("idCliente", "==", null)
        .get();
      // pegar dataHora (firestore.timestamp) de cada horario
      query.docs.forEach((doc) => {
        const dados = { ...doc.data() };
        timestamps.push(dados.dataHora);
      });
    } catch (err) {
      console.error(err);
    }
    // retornar lista de timestamps
    return timestamps;
  };

  const getDateStrings = (timestamps) => {
    const dateStrings = [];
    // transformar cada timestamp em dateString
    timestamps.forEach((data) => {
      const aux = data.toDate();
      aux.setHours(0, 0, 0, 0);
      dateStrings.push(aux.toISOString());
    });
    // retornar dateStrings unicos
    return [...new Set(dateStrings)];
  };

  const getDateOpts = (dateStrings) => {
    const opts = [];
    dateStrings.forEach((dateStr) => {
      const dateObj = new Date(Date.parse(dateStr));
      opts.push({
        dia: dateObj.getDate(),
        mes: getMes(dateObj),
        diaSem: getDiaSem(dateObj),
        data: dateObj,
      });
    });
    return opts;
  };

  const getDiaSem = (data) => {
    const local = "pt-BR";
    const opts = { weekday: "short" };
    const nomeData = data.toLocaleDateString(local, opts);
    return tratarNomeData(nomeData);
  };

  const getMes = (data) => {
    const local = "pt-BR";
    const opts = { month: "short" };
    const nomeData = data.toLocaleDateString(local, opts);
    return tratarNomeData(nomeData);
  };

  const tratarNomeData = (nomeData) => {
    // remover ponto e capitalizar nome da data
    let res = nomeData.replace(".", "");
    res = res.charAt(0).toUpperCase() + res.slice(1);
    return res;
  };

  return { getDatas };
};
