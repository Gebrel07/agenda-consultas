import { useEffect } from "react";
import { useAlertContext } from "../hooks/useAlertContext";
import styles from "./Alert.module.css";

export default function Alert() {
  const { title, body, cls, hideAlert } = useAlertContext();

  useEffect(() => {
    if (title) {
      const timeoutId = setTimeout(() => {
        hideAlert();
      }, 5 * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [title, hideAlert]);

  if (!title) {
    return null;
  }

  return (
    <div className={`alert ${cls} ${styles.container} p-4`} role="alert">
      <div className="d-flex justify-content-between align-items-center">
        <span>{title}</span>
        <button className="btn-close" onClick={hideAlert}></button>
      </div>
      {body && <>{body}</>}
    </div>
  );
}
