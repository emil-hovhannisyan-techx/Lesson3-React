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

  const handleSubmit = () => {
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

        <div className="login-card">
          <div className="login-form-group">
            <label className="form-label">
              <User className="label-icon" />
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="login-form-group">
            <label className="form-label">
              <Mail className="label-icon" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter your email"
              className="form-input"
            />
          </div>

          <button onClick={handleSubmit} className="login-btn">
            Sign In →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
