import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// hooks
import { useAuthContext } from "./hooks/useAuthcontext";

// styles
import "./App.css";

// pages
import BuscaHorarios from "./pages/BuscaHorarios/BuscaHorarios";
import CriarConta from "./pages/CriarConta/CriarConta";
import Home from "./pages/Home/Home";
import Index from "./pages/Index/Index";
import Login from "./pages/Login/Login";
import MinhaAgenda from "./pages/MinhaAgenda/MinhaAgenda";
import MinhaConta from "./pages/MinhaConta/MinhaConta";
import Agenda from "./pages/agenda/Agenda";
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
              <Route path="/" element={<Index />} />
              <Route path="/criar-conta" element={user ? <Navigate to="/home" /> : <CriarConta />} />
              <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
              <Route path="/home" element={<RouteGuard TargetPage={Home} />} />
              <Route path="/horarios" element={<RouteGuard TargetPage={BuscaHorarios} />} />
              <Route path="minha-agenda" element={<RouteGuard TargetPage={MinhaAgenda} />} />
              <Route path="minha-conta" element={<RouteGuard TargetPage={MinhaConta} />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
