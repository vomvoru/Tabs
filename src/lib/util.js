export const getIdGenerator = (prefix = "id_") => {
  let id = 0;
  return () => {
    id += 1;
    return prefix + id;
  };
};
