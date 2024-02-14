import { useContext } from "react";
import { AlertContext } from "../context/AlertContext";

export const useAlertContext = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw Error("AlertContext must be inside an AuthContextProvider");
  }

  return context;
};
