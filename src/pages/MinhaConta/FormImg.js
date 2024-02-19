import { useState } from "react";
import { useAlertContext } from "../../hooks/useAlertContext";
import { useThumbnail } from "../../hooks/useThumbnail";

export default function FormImg({ onClose }) {
  const { showAlert } = useAlertContext();
  const [isPending, setIspending] = useState(false);
  const [error, setError] = useState(null);
  const [img, setImg] = useState(null);

  const { maxSizeBytes, updateUserThumbnail, validateThumbnailImg } = useThumbnail();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIspending(true);
    setError(null);

    const validacao = validateThumbnailImg(img);
    if (!validacao.ok) {
      setIspending(false);
      setImg(null);
      setError(validacao.msg);
      return null;
    }

    try {
      await updateUserThumbnail(img);
      showAlert("Foto alterada com sucesso!", "alert-success");
      onClose();
    } catch (err) {
      console.error(err.message);
      setError("Erro ao atualizar a foto");
      setIspending(false);
    }
  };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    const validation = validateThumbnailImg(newFile);
    if (validation.ok) {
      setImg(newFile);
      setError(null);
    } else {
      setImg(null);
      setError(validation.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Insira uma imagem com no máximo {maxSizeBytes / 1000}kb</p>
      <fieldset disabled={isPending ? true : false}>
        <label className="form-label">Escolha uma Imagem</label>
        <input className="form-control" type="file" required onChange={handleFileChange} />
      </fieldset>
      <button
        type="submit"
        className="btn btn-primary mt-3 w-100"
        disabled={isPending || !img ? true : false}>
        Salvar
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </form>
  );
}
