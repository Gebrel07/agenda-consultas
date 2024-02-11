import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthcontext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
      }
    }

    if (!isCancelled) {
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { error, isPending, logout };
};
