import { useEffect, useState } from "react";
import { useDatas } from "../../hooks/useDatas";

// estilos
import styles from "./BuscaHorarios.module.css";

// componentes
import Spinner from "../../components/Spinner";

export default function Datas({ onSelData }) {
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [datas, setDatas] = useState(null);
  const [dataSel, setDataSel] = useState(null); // data selecionada atualmente
  const { getDatas } = useDatas();

  useEffect(() => {
    getDatas()
      .then((res) => {
        setDatas(res);
        setIsPending(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao carregar as datas");
        setIsPending(false);
      });
    // eslint-disable-next-line
  }, []);

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!datas) {
    <p>Nenhuma data disponível para agendamento</p>;
  }

  // NOTE: a data de cada objeto de getDatas é única. Usar elas como chave
  return (
    <div className={`${styles["container-datas"]} d-flex gap-3 pb-3`}>
      {datas.map((data) => (
        <div
          key={data.data}
          className={`${styles["opc-data"]} border border-secondary rounded 
          shadow py-2 px-4 text-center ${data.data === dataSel ? "bg-secondary" : ""}`}
          onClick={() => {
            setDataSel(data.data);
            onSelData(data.data);
          }}>
          <span>{data.diaSem}</span>
          <h4 className="m-0">{data.dia}</h4>
          <span>{data.mes}</span>
        </div>
      ))}
    </div>
  );
}
