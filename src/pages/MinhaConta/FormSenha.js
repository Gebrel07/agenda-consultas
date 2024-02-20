import firebase from "firebase/compat/app";
import { useState } from "react";
import { projectAuth } from "../../firebase/config";
import { useAlertContext } from "../../hooks/useAlertContext";
import { useAuthContext } from "../../hooks/useAuthcontext";
import { useSenha } from "../../hooks/useSenha";

export default function FormSenha({ onClose }) {
  const { user, dispatch } = useAuthContext();
  const { showAlert } = useAlertContext();
  const { validarSenha } = useSenha();

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    // validar nova senha
    const validacao = validarSenha(novaSenha);
    if (!validacao.ok) {
      setError(validacao.msg);
      setIsPending(false);
      return null;
    }
    // validar confirmação
    if (novaSenha !== confirmSenha) {
      setError("A Confirmação e Senha devem ser iguais");
      setIsPending(false);
      return null;
    }
    // atualizar senha
    try {
      await reautenticarUsuario();
      await projectAuth.currentUser.updatePassword(novaSenha);
      // dispatch login para recarregar infos do usuario em AuthContext
      dispatch({ type: "LOGIN", payload: projectAuth.currentUser });
      // mostrar alerta e fechar modal
      showAlert("Senha alterada com sucesso!", "alert-success");
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsPending(false);
    }
  };

  const reautenticarUsuario = async () => {
    const credenciais = firebase.auth.EmailAuthProvider.credential(user.email, senhaAtual);
    await projectAuth.currentUser.reauthenticateWithCredential(credenciais);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isPending ? true : false}>
          <label className="form-label">Senha Atual</label>
          <input
            type="password"
            className="form-control"
            required
            onChange={(e) => setSenhaAtual(e.target.value)}
            value={senhaAtual}
            autoFocus
          />
          <label className="form-label">Nova Senha</label>
          <input
            type="password"
            className="form-control"
            required
            onChange={(e) => setNovaSenha(e.target.value)}
            value={novaSenha}
          />
          <label className="form-label">Confirmar Nova Senha</label>
          <input
            type="password"
            className="form-control"
            required
            onChange={(e) => setConfirmSenha(e.target.value)}
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
