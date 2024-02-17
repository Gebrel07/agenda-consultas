import styles from "./Modal.module.css";

export default function Modal({ title, onClose, children }) {
  return (
    <div className={styles.backdrop}>
      <div className="border rounded bg-white">
        <div className="d-flex justify-content-between border-bottom p-2">
          <span className="fw-bold">{title}</span>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
}
