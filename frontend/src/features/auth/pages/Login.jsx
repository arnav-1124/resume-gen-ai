import "../auth.form.scss";
import { Link } from "react-router";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="button primary-button">
            Login
          </button>
        </form>
        <div className="login-register-toggle">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
