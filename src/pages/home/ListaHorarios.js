import { useNavigate } from "react-router-dom";
import doctorIcon from "../../assets/user-doctor.svg";
import { useAuthContext } from "../../hooks/useAuthcontext";
import { useHorarios } from "../../hooks/useHorarios";

export default function ListaHorarios({ horarios }) {
  const { updateIdCliente } = useHorarios();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = async (idhorario) => {
    // reservar horario e redirecionar para agenda do usuário
    await updateIdCliente(idhorario, user.uid);
    navigate("/minha-agenda");
  };

  return (
    <>
      {horarios.map((horario) => (
        <div
          key={horario.id}
          className="d-flex justify-content-between mb-3 p-2 border 
          border-secondary rounded align-items-center">
          <div>
            <div className="d-flex">
              <div>
                <img
                  className="border border-secondary rounded me-2"
                  src={horario.prof.img ? horario.prof.img : doctorIcon}
                  width="60px"
                  height="100%"
                  alt="Imagem profissional"
                />
              </div>
              <div>
                <span className="fw-bold">{horario.prof.nome}</span> <br />
                <span>{horario.prof.registro}</span> <br />
                <span>Sexo: {horario.prof.sexo}</span>
              </div>
            </div>
            <div className="mt-2">
              <span>Data: {horario.data}</span> <br />
              <span>Hora: {horario.hora}</span>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => handleClick(horario.id)}>
            Agendar
          </button>
        </div>
      ))}
    </>
  );
}
