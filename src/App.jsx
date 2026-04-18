import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import { logout } from "./services/AuthService";
import './App.css';

function App() {
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const isAuthenticated = !!localStorage.getItem("accessToken");

  return (
    <Router>
      <div className>
        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center mb-4 border-bottom pb-3 gap-2">
          <h2 className="m-0 text-center text-md-start">
            Student Management System
          </h2>

          {isAuthenticated && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <Routes>
          {/* New Signup Route */}
          <Route path="/signup" element={<Signup />} />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <Login onLoginSuccess={() => (window.location.href = "/")} />
            }
          />

          {/* Protected Dashboard Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* If they type a random URL, send them to Signup if they aren't logged in */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/signup"} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
