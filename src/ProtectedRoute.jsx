import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLogin =
    localStorage.getItem("login") === "true";

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;