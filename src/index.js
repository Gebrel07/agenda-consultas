import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// contextos
import { AlertContextProvider } from "./context/AlertContext";
import { AuthContextProvider } from "./context/AuthContext";

// estilos
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
