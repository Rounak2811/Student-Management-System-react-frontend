import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import { logout } from "./services/AuthService";
import './App.css';


import loginImage from './assets/login_page_image.jpg';
import signupImage from './assets/login_page_image.jpg'; // Assuming you have this
import dashboardImage from './assets/student.jpg';

// 1. Create an inner layout component
function MainLayout() {
  const location = useLocation(); // Gets the current URL path
  const isAuthenticated = !!localStorage.getItem("accessToken");

  let textColor=isAuthenticated?`primary`:`white`;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  // 2. Determine which background image to use based on the path
  let currentBgImage;
  if (location.pathname === "/login") {
    currentBgImage = loginImage;
  } else if (location.pathname === "/signup") {
    currentBgImage = signupImage;
  } else {
    // Default to dashboard/student image if authenticated or on other routes
    currentBgImage = dashboardImage;
  }

  return (
    <div className="app-wrapper">
      {/* 3. The blurred background layer */}
      <div
        className="blurred-background"
        style={{ backgroundImage: `url(${currentBgImage})` }}
      ></div>

      {/* 4. The sharp foreground layer */}
      <div className="content-layer">
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center mb-4 border-bottom pb-3 gap-2">
          <h2 className={`m-3 text-center text-md-start text-${textColor}`}>
            Student Management System
          </h2>

          {isAuthenticated && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <Routes>
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/login"
            element={
              <Login onLoginSuccess={() => (window.location.href = "/")} />
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/signup"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

// 5. App acts as the Router provider wrapper
function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;