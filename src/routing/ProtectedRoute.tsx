import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC = () => {
  const isAuthenticated = sessionStorage.getItem("jwtToken")
  return isAuthenticated ? <Outlet /> : <Navigate to={"/"}/>  
}

export default ProtectedRoute