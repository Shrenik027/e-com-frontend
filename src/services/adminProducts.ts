import API from "@/services/api";

/* ======================
   ADMIN PRODUCT APIs
====================== */

// GET products (with filters later)
export const fetchProducts = async (params = {}) => {
  const res = await API.get("/products", { params });
  return res.data;
};

// CREATE product
export const createProduct = async (data: FormData) => {
  const res = await API.post("/products", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// UPDATE product
export const updateProduct = async (id: string, data: FormData | object) => {
  const res = await API.put(`/products/${id}`, data);
  return res.data;
};

// DELETE product
export const deleteProduct = async (id: string) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

// GET single product
export const getProductById = async (id: string) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};
