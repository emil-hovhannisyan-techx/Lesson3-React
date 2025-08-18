import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Sparkles } from "lucide-react";
import UserContext from "../context/UserContext";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, currentUser, handleLogout } = useContext(UserContext);
  const location = useLocation();

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
              <Link
                to={`/user/${currentUser?.id}`}
                className={`nav-btn ${
                  location.pathname.startsWith("/user") ? "highlight" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/article"
                className={`nav-btn ${
                  location.pathname.startsWith("/article") ? "highlight" : ""
                }`}
              >
                Article
              </Link>
              <Link to="/login" onClick={handleLogout} className="logout-btn">
                <LogOut className="icon" />
                <span>Logout</span>
              </Link>
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
