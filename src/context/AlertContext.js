import { createContext, useState } from "react";

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [cls, setCls] = useState(null);

  const showAlert = (alertTitle, alertClass = null, alertBody = null) => {
    setTitle(alertTitle);
    setBody(alertBody);
    setCls(alertClass);
  };

  const hideAlert = () => {
    setTitle(null);
    setBody(null);
  };

  return (
    <AlertContext.Provider value={{ title, body, cls, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
