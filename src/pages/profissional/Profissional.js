import { useHistory, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import InfosGerais from "./InfosGerais";
import "./Profissional.css";

export default function Profissional() {
  const { id } = useParams();
  const history = useHistory();
  const url = `http://localhost:3000/profissionais/${id}`;
  const { data: prof, isPending, error } = useFetch(url);

  return (
    <div className="profissional">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Carregando...</p>}
      {prof && (
        <div>
          <button className="btn btn-primary mb-2" onClick={() => history.goBack()}>
            Voltar
          </button>
          <div className="border border-secondary rounded p-4 rounded shadow">
            <InfosGerais profissional={prof} />
          </div>
        </div>
      )}
    </div>
  );
}
