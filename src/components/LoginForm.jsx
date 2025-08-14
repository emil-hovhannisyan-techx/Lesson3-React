import React, { useContext, useState } from "react";
import { User, Mail } from "lucide-react";
import UserContext from "../context/UserContext";
import "./LoginForm.css";

const LoginForm = () => {
  const { handleLogin } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (formData.username.trim()) {
      handleLogin({ username: formData.username, email: formData.email });
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

        {/* Use form so Enter works */}
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

          <button type="submit" className="login-btn">
            Sign In →
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
