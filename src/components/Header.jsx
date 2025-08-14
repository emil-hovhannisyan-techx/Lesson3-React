import React, { useContext } from "react";
import { LogOut, Sparkles } from "lucide-react";
import UserContext from "../context/UserContext";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, currentUser, handleLogout } = useContext(UserContext);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <Sparkles />
          </div>
          <h1 className="header-title">Personal Dashboard</h1>
        </div>

        <div className="header-right">
          {isLoggedIn ? (
            <>
              <span className="welcome-text">
                Welcome back,{" "}
                <span className="username">{currentUser?.username}</span>
              </span>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut className="icon" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <span className="login-prompt">
              Please log in to access your dashboard
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
