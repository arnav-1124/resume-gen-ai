import { Link } from "react-router";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <main>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email "
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
            Create Account
          </button>
        </form>
        <div className="login-register-toggle">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
