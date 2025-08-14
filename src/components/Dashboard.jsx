import React, { useContext } from "react";
import { UserCircle, Mail, Calendar, Activity, TrendingUp } from "lucide-react";
import UserContext from "../context/UserContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { currentUser } = useContext(UserContext);

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const recentActivities = [
    {
      id: 1,
      action: "Successfully logged in",
      time: "Just now",
      status: "success",
    },
    { id: 2, action: "Dashboard accessed", time: "Just now", status: "info" },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1 className="welcome-title">
            Welcome back, {currentUser?.username}!
          </h1>
          <p className="welcome-date">Today is {getCurrentDate()}</p>
          <div className="welcome-divider"></div>
        </div>

        <div className="cards-grid">
          <div className="info-card">
            <div className="card-header">
              <h3 className="card-title">Profile</h3>
              <div className="card-icon blue">
                <UserCircle />
              </div>
            </div>
            <p className="card-main-text">{currentUser?.username}</p>
            <p className="card-status green">Active user</p>
          </div>

          <div className="info-card">
            <div className="card-header">
              <h3 className="card-title">Email</h3>
              <div className="card-icon orange">
                <Mail />
              </div>
            </div>
            <p className="card-main-text">
              {currentUser?.email || "user@example.com"}
            </p>
            <p className="card-status green">Verified account</p>
          </div>

          <div className="info-card">
            <div className="card-header">
              <h3 className="card-title">Last Login</h3>
              <div className="card-icon green">
                <Calendar />
              </div>
            </div>
            <p className="card-main-text">Today</p>
            <p className="card-status blue">Session active</p>
          </div>
        </div>

        <div className="activity-card">
          <div className="activity-header">
            <div className="activity-icon">
              <Activity />
            </div>
            <div>
              <h3 className="activity-title">Recent Activity</h3>
              <p className="activity-subtitle">
                Your recent dashboard activities
              </p>
            </div>
          </div>

          {recentActivities.map((a) => (
            <div key={a.id} className={`activity-item ${a.status}`}>
              <div className="activity-left">
                <span className="activity-dot"></span>
                <span className="activity-text">{a.action}</span>
              </div>
              <div className="activity-right">
                <span className="activity-time">{a.time}</span>
                <TrendingUp className="activity-trend" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
