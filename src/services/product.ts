import API from "./api";

export const getSingleProduct = async (id: string) => {
  const res = await API.get(`/products/${id}`);
  return res.data; // backend returns product directly
};

export const getProducts = async (params: Record<string, any>) => {
  const res = await API.get("/products", { params });
  return res.data;
};
