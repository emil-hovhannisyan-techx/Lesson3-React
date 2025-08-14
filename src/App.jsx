import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import UserContext from "./context/UserContext";
import {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "./utils/localStorage";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    saveUserToLocalStorage(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    removeUserFromLocalStorage();
  };

  useEffect(() => {
    const savedUser = getUserFromLocalStorage();
    if (savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(savedUser);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, currentUser, handleLogin, handleLogout }}
    >
      <div className="app">
        <Header />
        {isLoggedIn ? <Dashboard /> : <LoginForm />}
      </div>
    </UserContext.Provider>
  );
};

export default App;
