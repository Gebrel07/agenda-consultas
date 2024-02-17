import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthcontext";

export const useCurrentUser = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const updateDisplayName = async (displayName) => {
    setError(null);
    setIsPending(true);

    try {
      await projectAuth.currentUser.updateProfile({ displayName });

      // dispatch login para recarregar infos do usuario no contexto
      dispatch({ type: "LOGIN", payload: projectAuth.currentUser });

      if (!isCancelled) {
        setError(null);
      }
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

  return { error, isPending, updateDisplayName };
};
