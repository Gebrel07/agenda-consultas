import DefaultPic from "../../assets/user-doctor.svg";
import "./Agenda.css";

export default function CardProfissional({ profissional, horarios }) {
  const selectHorario = (idHorario) => {
    window.alert("Horario selecionado: " + idHorario);
  };

  return (
    <>
      <div className="d-flex">
        <div className="border border-secondary rounded me-2">
          <img
            src={profissional.img ? profissional.img : DefaultPic}
            width="100px"
            alt="Imagem profissional"
          />
        </div>
        <div>
          <b>{profissional.nome}</b>
          <p>Registro: {profissional.registro}</p>
        </div>
      </div>
      <div className="my-2 d-flex horarios py-3">
        {horarios.map((horario) => (
          <button
            key={horario.id}
            className="btn btn-primary me-3"
            onClick={() => {
              selectHorario(horario.id);
            }}>
            {horario.hora}
          </button>
        ))}
      </div>
    </>
  );
}
