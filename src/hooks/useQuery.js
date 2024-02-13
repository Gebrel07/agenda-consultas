export const useQuery = () => {
  const getDocsFromQuery = (query) => {
    const res = [];
    query.docs.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id });
    });
    return res;
  };

  const timestampToDateString = (timestamp) => {
    const opts = { day: "numeric", month: "short" };
    return timestamp.toDate().toLocaleString("pt-BR", opts);
  };

  const timestampToHourString = (timestamp) => {
    const opts = { hour: "numeric", minute: "numeric" };
    return timestamp.toDate().toLocaleString("pt-BR", opts);
  };

  return { getDocsFromQuery, timestampToDateString, timestampToHourString };
};
