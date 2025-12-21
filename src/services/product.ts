import API from "./api";

export const getSingleProduct = async (id: string) => {
  const res = await API.get(`/products/${id}`);
  return res.data; // backend returns product directly
};
