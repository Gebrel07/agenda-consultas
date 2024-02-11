import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

export default function CriarConta() {
  const { error, isPending, signUp } = useSignup();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha !== confirmSenha) {
      window.alert("Confirmação de Senha incorreta");
      return null;
    }
    signUp(email, senha, nome);
  };

  return (
    <form className="p-4 rounded border shadow" onSubmit={handleSubmit}>
      <legend>Criar Conta</legend>
      <div className="mb-3">
        <label className="form-label">Nome</label>
        <input
          className="form-control"
          type="text"
          required
          onChange={(e) => {
            setNome(e.target.value);
          }}
          value={nome}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          className="form-control"
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Senha</label>
        <input
          className="form-control"
          type="password"
          required
          onChange={(e) => {
            setSenha(e.target.value);
          }}
          value={senha}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Confirmação de Senha</label>
        <input
          className="form-control"
          type="password"
          required
          onChange={(e) => {
            setConfirmSenha(e.target.value);
          }}
          value={confirmSenha}
        />
      </div>
      {!isPending && <button className="btn btn-primary w-100">Criar Conta</button>}
      {isPending && (
        <button className="btn btn-primary w-100" disabled>
          Carregando...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
