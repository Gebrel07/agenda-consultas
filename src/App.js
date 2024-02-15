import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// hooks
import { useAuthContext } from "./hooks/useAuthcontext";

// styles
import "./App.css";

// pages
import Agenda from "./pages/agenda/Agenda";
import BuscaHorarios from "./pages/BuscaHorarios/BuscaHorarios";
import CriarConta from "./pages/criarConta/CriarConta";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MinhaAgenda from "./pages/minha-agenda/MinhaAgenda";
import CriarProfissional from "./pages/profissional/CriarProfissional";
import Profissional from "./pages/profissional/Profissional";

// components
import RouteGuard from "./RouteGuard";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <NavBar />
          <div className="app-content">
            <Alert />
            <Routes>
              <Route
                path="/profissionais/criar"
                element={<RouteGuard TargetPage={CriarProfissional} />}
              />
              <Route path="/profissionais/:id" element={<RouteGuard TargetPage={Profissional} />} />
              <Route path="/agenda" element={<RouteGuard TargetPage={Agenda} />} />
              <Route path="/criar-conta" element={user ? <Navigate to="/home" /> : <CriarConta />} />
              <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
              <Route path="/home" element={<RouteGuard TargetPage={Home} />} />
              <Route path="/horarios" element={<RouteGuard TargetPage={BuscaHorarios} />} />
              <Route path="minha-agenda" element={<RouteGuard TargetPage={MinhaAgenda} />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
