import "./App.css";
import React, { useState, useEffect } from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import Register from "./components/common/register";
import Login from "./components/common/login";
import Navbar from "./components/common/navbar";
import Home from "./components/home";
import Test from "./components/Test";
import Profile from "./components/profile";
import ProtectedRoute from "./components/common/protectedRoute";
import { getUserLocalStorage, logout } from "./../src/services/authService";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserLocalStorage());
  }, []);

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  const handleLogin = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      <Navbar user={user} onLogout={handleLogout} />
      <Switch>
        <Redirect exact from="/" to="/home" />

        <ProtectedRoute path="/home" exact component={Home} />

        <Route path="/register" component={Register} />
        <Route
          path="/login"
          render={(props) => <Login {...props} onLogin={handleLogin} />}
        />

        <Route path="/test" component={Test} />
        <Route path="/logout" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
