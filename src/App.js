import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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
            <Switch>
              <Route exact path="/">
                <RouteGuard TargetPage={Home} />
              </Route>
              <Route exact path="/profissionais/criar">
                <RouteGuard TargetPage={CriarProfissional} />
              </Route>
              <Route exact path="/profissionais/:id">
                <RouteGuard TargetPage={Profissional} />
              </Route>
              <Route path="/agenda">
                <RouteGuard TargetPage={Agenda} />
              </Route>
              <Route path="/criar-conta">
                {user && <Redirect to="/" />}
                {!user && <CriarConta />}
              </Route>
              <Route path="/login">
                {user && <Redirect to="/" />}
                {!user && <Login />}
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
