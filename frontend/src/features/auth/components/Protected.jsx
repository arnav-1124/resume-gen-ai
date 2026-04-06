import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Protected = ({ children }) => {
  const { loading, user } = useAuth();


  if (loading)
    return (
      <main>
        <div className="loading-wrap" role="status" aria-live="polite">
          <span className="loader-ring" aria-hidden="true"></span>
          <h1 className="loading">Loading...</h1>
        </div>
      </main>
    );

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
