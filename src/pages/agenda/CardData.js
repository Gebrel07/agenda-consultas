import CardProfissional from "./CardProfissional";

export default function CardData({ data, profissionais }) {
  // TODO: mudar formato para pt-br, validar precisão
  let dataFormatada = new Date(data).toDateString();

  return (
    <>
      <span className="fw-bold">{dataFormatada}</span>
      <div className="border rounded shadow p-2">
        {profissionais.map((prof, indexProf) => (
          <div key={prof.id}>
            {indexProf > 0 && <hr className="border border-dark" />}
            <CardProfissional profissional={prof} horarios={prof.horarios} />
          </div>
        ))}
      </div>
    </>
  );
}
