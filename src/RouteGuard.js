import { Redirect } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthcontext";

export default function RouteGuard({ TargetPage }) {
  const { user } = useAuthContext();

  return (
    <>
      {user && <TargetPage />}
      {!user && <Redirect to="/login" />}
    </>
  );
}
