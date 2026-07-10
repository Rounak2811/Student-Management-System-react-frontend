// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { login } from "../services/AuthService";

// function Login({ onLoginSuccess }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await login(username, password);
//       onLoginSuccess();
//     } catch (err) {
//       setError("Invalid username or password");
//     }
//   };

//   return (
//     <div className={`card m-auto`} >
//       <h3 className="text-center mb-4">Login</h3>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           className="form-control mb-3"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           className="form-control mb-3"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button className="btn btn-primary w-100 mb-3" type="submit">
//           Login
//         </button>
//       </form>

//       <div className="text-center">
//         <span>Don't have an account? </span>
//         <Link to="/signup">Sign up here</Link>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/AuthService";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeComponent, setActiveComponent] = useState('component')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setActiveComponent('spinner');
      await login(username, password);
      onLoginSuccess();
      setActiveComponent('spinner')
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100" style={{ minHeight: "60vh", flexGrow: 1 }}>
      <div className="ledger-card auth-card">
        <div className="auth-icon">S</div>
        <span className="ledger-eyebrow text-center d-block">Welcome back</span>
        <h3 className="text-center mb-4">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        {activeComponent === "component" && <form onSubmit={handleLogin}>
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
        </form>}

        {activeComponent === "spinner" && <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Logging ${username} in...</span>
        </div>}

        <div className="text-center mt-3">
          <span className="text-secondary">Don't have an account? </span>
          <Link to="/signup">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
