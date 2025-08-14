import React, { useState, useEffect, useContext } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import UserContext from "./context/UserContext";
import {
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  generateUserId,
} from "./utils/localStorage";
import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, currentUser } = useContext(UserContext);
  console.log(
    "ProtectedRoute - isLoggedIn:",
    isLoggedIn,
    "currentUser:",
    currentUser
  );

  if (!isLoggedIn) {
    console.log("Not logged in, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("Logged in, rendering dashboard");
  return children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    console.log("handleLogin called with:", userData);

    const userWithId = {
      ...userData,
      id: generateUserId(),
    };

    setCurrentUser(userWithId);
    setIsLoggedIn(true);
    saveUserToLocalStorage(userWithId);
    console.log("Login state updated - isLoggedIn should now be true");
  };

  const handleLogout = () => {
    console.log("Logging out user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    removeUserFromLocalStorage();
  };

  useEffect(() => {
    console.log("Checking for saved user...");
    const savedUser = getUserFromLocalStorage();
    if (savedUser) {
      console.log("Found saved user:", savedUser);
      setCurrentUser(savedUser);
      setIsLoggedIn(true);
    } else {
      console.log("No saved user found");
    }
  }, []);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/login",
        element: (
          <div className="app">
            <Header />
            <LoginForm />
          </div>
        ),
      },
      {
        path: "/user/:id",
        element: (
          <div className="app">
            <Header />
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </div>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
    // again, why???
    {
      future: {
        v7_normalizeFormMethod: true,
      },
    }
  );
  //debug... why??
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <UserContext.Provider
      value={{ isLoggedIn, currentUser, handleLogin, handleLogout }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
