import styles from "./Modal.module.css";

export default function ModalForm({ title, form, isOpen, onClose }) {
  const containerId = "form-container";

  const submitForm = () => {
    // encontrar form dentro do container e realizar submit
    document.querySelector(`#${containerId} form`).requestSubmit();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop}>
      <div className="border rounded bg-white">
        <div className="d-flex justify-content-between p-3">
          <span className="fw-bold">{title}</span>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="border-top border-bottom p-3" id={containerId}>
          {form}
        </div>
        <div className="d-flex justify-content-between p-3">
          <button type="submit" className="btn btn-primary" onClick={submitForm}>
            Salvar
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
