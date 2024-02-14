import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "./index.css";
import { AlertContextProvider } from "./context/AlertContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AlertContextProvider>
        <App />
      </AlertContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
