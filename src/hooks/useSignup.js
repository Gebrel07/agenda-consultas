import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthcontext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const resp = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!resp) {
        throw new Error("Could not complete signup");
      }

      // add displayName
      await resp.user.updateProfile({ displayName });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: resp.user });

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

  return { error, isPending, signUp };
};
