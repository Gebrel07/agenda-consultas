import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import ProfissionalForm from "./ProfissionalForm";

export default function CriarProfissional() {
  const navigate = useNavigate();
  const url = "http://localhost:3000/profissionais";
  const { data, postData } = useFetch(url, "POST");

  const handleSubmit = async (formData) => {
    postData(formData);
  };

  useEffect(() => {
    if (data) {
      navigate(`/profissionais/${data.id}`);
    }
  }, [data, navigate]);

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
