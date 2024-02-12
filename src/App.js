import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import RouteGuard from "./RouteGuard";
import NavBar from "./components/NavBar";
import { useAuthContext } from "./hooks/useAuthcontext";
import Agenda from "./pages/agenda/Agenda";
import CriarConta from "./pages/criarConta/CriarConta";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import CriarProfissional from "./pages/profissional/CriarProfissional";
import Profissional from "./pages/profissional/Profissional";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <NavBar />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<RouteGuard TargetPage={Home} />} />
              <Route
                path="/profissionais/criar"
                element={<RouteGuard TargetPage={CriarProfissional} />}
              />
              <Route path="/profissionais/:id" element={<RouteGuard TargetPage={Profissional} />} />
              <Route path="/agenda" element={<RouteGuard TargetPage={Agenda} />} />
              <Route path="/criar-conta" element={user ? <Navigate to="/" /> : <CriarConta />} />
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
