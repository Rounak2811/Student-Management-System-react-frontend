import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/AuthService";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      // Pass the user object matching your backend expectations
      await signup({ username, password });
      setMessage("Account created successfully! Redirecting to login...");

      // Wait 2 seconds so they can read the success message, then send to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError("Failed to create account. Username might already exist.");
    }
  };

  return (
    <div className="card p-4 mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Create an Account</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSignup}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Choose a Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Choose a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-success w-100 mb-3" type="submit">
          Sign Up
        </button>
      </form>

      <div className="text-center">
        <span>Already have an account? </span>
        <Link to="/login">Log in here</Link>
      </div>
    </div>
  );
}

export default Signup;
