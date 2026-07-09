import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function PublicRoute({ children }) {
  const { user } = useAuth();

  if(user){
    return <Navigate to="/" />
  }
  else {
    return children
  }
}