import { useFetch } from "../../hooks/useFetch";
import CardData from "./CardData";

export default function Agenda() {
  const { data: agenda, isPending, error } = useFetch("http://localhost:3000/agenda");
  return (
    <div className="agenda">
      {error && <div>{error}</div>}
      {isPending && <div>Carregando...</div>}
      {agenda &&
        agenda.map((registro, index) => (
          <div key={index} className={index > 0 ? "mt-4" : ""}>
            <CardData data={registro.data} profissionais={registro.profissionais} />
          </div>
        ))}
    </div>
  );
}
