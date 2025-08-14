import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail } from "lucide-react";
import UserContext from "../context/UserContext";
import "./LoginForm.css";

const LoginForm = () => {
  const { handleLogin, isLoggedIn, currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("LoginForm rendered, isLoggedIn:", isLoggedIn);

  // Auto-redirect when login state changes
  useEffect(() => {
    if (isLoggedIn && currentUser?.id) {
      console.log("Login detected, redirecting to user dashboard...");
      navigate(`/user/${currentUser.id}`, { replace: true });
    }
  }, [isLoggedIn, currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);

    if (formData.username.trim()) {
      console.log("Calling handleLogin...");
      handleLogin({ username: formData.username, email: formData.email });
      console.log("handleLogin called, setting isSubmitted...");
      setIsSubmitted(true);
      // Navigation will be handled by useEffect
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">
            Sign in to access your personal dashboard
          </p>
        </div>

        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="text-input" className="form-label">
              <User className="label-icon" />
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={handleChange}
              name="username"
              id="text-input"
              placeholder="Enter your username"
              className="form-input"
              autoComplete="username"
              required
            />
          </div>

          <div className="login-form-group">
            <label className="form-label" htmlFor="email-input">
              <Mail className="label-icon" />
              Email
            </label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
              id="email-input"
              name="email"
              placeholder="Enter your email"
              className="form-input"
              autoComplete="email"
            />
          </div>

          {isSubmitted ? (
            <div className="login-success">
              <p>Redirecting to dashboard...</p>
              <Link
                to={currentUser?.id ? `/user/${currentUser.id}` : "/"}
                className="login-btn"
              >
                Go to Dashboard →
              </Link>
            </div>
          ) : (
            <button type="submit" className="login-btn">
              Sign In →
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
