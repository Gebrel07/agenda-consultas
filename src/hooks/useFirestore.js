import { useEffect, useReducer, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = { document: null, isPending: false, error: null, success: null };

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return { isPending: false, document: action.payload, success: true, error: null };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "ERROR":
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [resp, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // collection ref
  const ref = projectFirestore.collection(collection);

  // add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      console.log(err.message);
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      console.log(err.message);
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // cleanup
  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { addDocument, deleteDocument, resp };
};
