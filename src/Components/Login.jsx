import { useState } from "react";
import { Link } from "react-router-dom"; 
import { login } from "../services/AuthService";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      onLoginSuccess();
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="card p-4 mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Login</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100 mb-3" type="submit">
          Login
        </button>
      </form>

      {/* Add this section to link to the Signup page */}
      <div className="text-center">
        <span>Don't have an account? </span>
        <Link to="/signup">Sign up here</Link>
      </div>
    </div>
  );
}

export default Login;
