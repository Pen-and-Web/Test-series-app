import "./App.css";
import Register from "./components/register";
import Navbar from "./components/common/navbar";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/common/login";
import Home from "./components/home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
