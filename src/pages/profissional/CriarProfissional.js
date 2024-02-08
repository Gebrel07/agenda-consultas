import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import ProfissionalForm from "./ProfissionalForm";

export default function CriarProfissional() {
  const history = useHistory();
  const url = "http://localhost:3000/profissionais";
  const { data, postData } = useFetch(url, "POST");

  const handleSubmit = async (formData) => {
    postData(formData);
  };

  useEffect(() => {
    if (data) {
      history.push(`/profissionais/${data.id}`);
    }
  }, [data, history]);

  return (
    <div>
      <ProfissionalForm
        formData={{}}
        formLegend={"Criar Profissional"}
        submitCallback={handleSubmit}
      />
    </div>
  );
}
