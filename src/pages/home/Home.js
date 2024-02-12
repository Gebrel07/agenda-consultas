import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useAgenda } from "../../hooks/useAgenda";
import ListaHorarios from "./ListaHorarios";

export default function Home() {
  const [data, setData] = useState(() => {
    // data inicial do formulario
    const today = new Date();
    today.setUTCDate(today.getDate());
    return today.toISOString().substring(0, 10);
  });
  const { agenda, isPending, getAgenda } = useAgenda();

  const handleSubmit = (e) => {
    e.preventDefault();
    getAgenda(new Date(Date.parse(data)));
  };

  useEffect(() => {
    getAgenda(data);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <form className="p-4 rounded border shadow mb-4" onSubmit={handleSubmit}>
        <legend>Buscar Horários</legend>
        <div className="mb-3">
          <label className="form-label">Data</label>
          <input
            className="form-control"
            type="date"
            onChange={(e) => setData(e.target.value)}
            value={data}
            required
          />
        </div>
        {isPending && (
          <button className="btn btn-primary w-100" disabled>
            Buscando...
          </button>
        )}
        {!isPending && <button className="btn btn-primary w-100">Buscar</button>}
      </form>
      {isPending && (
        <div style={{ marginTop: "150px" }}>
          <Spinner />
        </div>
      )}
      {!isPending && (
        <>
          {agenda.length ? (
            <ListaHorarios horarios={agenda} />
          ) : (
            <p className="text-center">Nenhum horário disponível</p>
          )}
        </>
      )}
    </>
  );
}
