import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";

export default function Login() {
  const { error, isPending, login } = useLogin();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, senha);
  };

  return (
    <form className="p-4 rounded border shadow" onSubmit={handleSubmit}>
      <legend>Login</legend>
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
      {!isPending && <button className="btn btn-primary w-100">Login</button>}
      {isPending && (
        <button className="btn btn-primary w-100" disabled>
          Carregando...
        </button>
      )}
      {error && <p>{error}</p>}
      <div className="text-center mt-3">
        <Link to="/criar-conta" className="text-primary">
          Criar Conta
        </Link>
      </div>
    </form>
  );
}
