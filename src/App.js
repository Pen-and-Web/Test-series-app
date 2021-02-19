import './App.css';
import React, { useState, useEffect } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/common/register';
import Login from './components/common/login';
import Navbar from './components/common/navbar';
import Home from './components/home';
import Test from './components/Test';
import Profile from './components/profile';
import ProtectedRoute from './components/common/protectedRoute';
import { getUserLocalStorage, logout } from './../src/services/authService';
import Reset from './components/reset';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserLocalStorage());
  }, []);

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  const setCurrentUser = () => {
    setUser(getUserLocalStorage());
  };

  return (
    <div className="App">
      <ToastContainer />
      <Navbar user={user} onLogout={handleLogout} />
      <Switch>
        <Redirect exact from="/" to="/home" />

        <ProtectedRoute path="/home" exact component={Home} />

        <Route
          path="/register"
          render={(props) => <Register {...props} onSignup={setCurrentUser} />}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} onLogin={setCurrentUser} />}
        />
        <Route path="/resetpass" component={Reset} />
        <Route path="/test" component={Test} />
        <Route path="/logout" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
