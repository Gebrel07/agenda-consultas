export default function ProfissionalForm({ formData, formLegend, submitCallback }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    submitCallback({ nome: e.target.nome.value, registro: e.target.registro.value });
  };

  return (
    <form className="p-4 rounded border shadow" onSubmit={handleSubmit}>
      <legend>{formLegend}</legend>
      <fieldset className="">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            name="nome"
            className="form-control"
            type="text"
            required
            defaultValue={formData.nome}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Registro</label>
          <input
            name="registro"
            className="form-control"
            type="text"
            required
            defaultValue={formData.registro}
          />
        </div>
        <button className="btn btn-primary w-100">Submit</button>
      </fieldset>
    </form>
  );
}
