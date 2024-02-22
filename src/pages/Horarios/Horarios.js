import { useState } from "react";

// componentes
import Datas from "./Datas";
import ListaProfs from "./ListaProfs";

export default function Horarios() {
  const [dataSel, setDataSel] = useState(null);

  const onSelData = (data) => {
    setDataSel(data);
  };

  return (
    <div>
      <p className="fw-bold">Selecione uma data:</p>
      <Datas onSelData={onSelData} />
      <ListaProfs dataSel={dataSel} />
    </div>
  );
}
