import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { useAgenda } from "../../hooks/useAgenda";
import ListaHorarios from "./ListaHorarios";

export default function BuscaHorarios() {
  const dateFromString = (dateString) => {
    const dateObj = new Date(Date.parse(dateString));
    return dateObj;
  };

  const dateToString = (dateObj) => {
    return dateObj.toISOString().substring(0, 10);
  };

  const [data, setData] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
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
            onChange={(e) => setData(dateFromString(e.target.value))}
            value={dateToString(data)}
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
