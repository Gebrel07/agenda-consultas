import { projectFirestore } from "../firebase/config";

export const useProfissionais = () => {
  const ref = projectFirestore.collection("profissionais");

  const getProfissionais = async () => {
    const query = await ref.orderBy("nome", "asc").get();
    const res = [];
    query.docs.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
    return res;
  };

  return { getProfissionais };
};
