import { useState } from "react";
import { useAlertContext } from "../../hooks/useAlertContext";
import { useAuthContext } from "../../hooks/useAuthcontext";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function FormNome({ onClose }) {
  const { showAlert } = useAlertContext();
  const { user } = useAuthContext();
  const { updateDisplayName, error, isPending } = useCurrentUser();
  const [displayName, setDisplayName] = useState(user.displayName);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (displayName === user.displayName) {
      onClose();
      return null;
    }

    updateDisplayName(displayName);

    if (!error) {
      showAlert("Nome alterado com sucesso!", "alert-success");
      onClose();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="form-label">Nome</label>
        <fieldset disabled={isPending ? true : false}>
          <input
            className="form-control"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </fieldset>
        <button
          type="submit"
          className="btn btn-primary mt-3 w-100"
          disabled={isPending ? true : false}>
          Salvar
        </button>
      </form>
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}
