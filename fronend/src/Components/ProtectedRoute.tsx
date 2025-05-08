import { Navigate, Outlet } from "react-router-dom";
import { UseAuth } from "../context/Auth/Auth/AuthContext";

const ProtectedRoute = () => {
  console.log("protected Route");
  const { isAuthentcated } = UseAuth();
  if (!isAuthentcated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
