import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Agenda from "./pages/agenda/Agenda";
import Home from "./pages/home/Home";
import CriarProfissional from "./pages/profissional/CriarProfissional";
import Profissional from "./pages/profissional/Profissional";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="app-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profissionais/criar">
              <CriarProfissional />
            </Route>
            <Route exact path="/profissionais/:id">
              <Profissional />
            </Route>
            <Route path="/agenda">
              <Agenda />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
