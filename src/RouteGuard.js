import { Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthcontext";

export default function RouteGuard({ TargetPage }) {
  const { user } = useAuthContext();

  return (
    <>
      {user && <TargetPage />}
      {!user && <Navigate to="/login" />}
    </>
  );
}
