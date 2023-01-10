import { Navigate } from "react-router-dom";
import { useAuth } from "@Auth/context/AuthContext";
import { ReactElement } from "react";

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const auth = useAuth();
  const currentUser = auth?.currentUser;
  return 1 ? children : <Navigate to={"/login"} />;
}
