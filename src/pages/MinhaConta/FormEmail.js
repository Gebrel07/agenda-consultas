import { useState } from "react";
import { projectAuth } from "../../firebase/config";
import { useAlertContext } from "../../hooks/useAlertContext";
import { useAuthContext } from "../../hooks/useAuthcontext";

export default function FormEmail({ onClose }) {
  const { user, dispatch } = useAuthContext();
  const { showAlert } = useAlertContext();

  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState(null);
  const [isPending, setIspending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === user.email) {
      // se email não mudar, apenas feche
      onClose();
      return null;
    }
    setIspending(true);
    setError(null);
    try {
      await projectAuth.currentUser.updateEmail(email);
      // dispatch login para recarregar infos do usuario em AuthContext
      dispatch({ type: "LOGIN", payload: projectAuth.currentUser });
      // mostrar alerta e fechar modal
      showAlert("Email alterado com sucesso!", "alert-success");
      onClose();
    } catch (err) {
      setError(err.message);
    }
    setIspending(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Nome</label>
        <fieldset disabled={isPending ? true : false}>
          <input
            type="email"
            className="form-control"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoFocus
          />
        </fieldset>
        <button
          type="submit"
          className="btn btn-primary mt-3 w-100"
          disabled={isPending ? true : false}>
          Salvar
        </button>
      </form>
      {error && <p className="mt-2 text-danger">{error}</p>}
    </>
  );
}
