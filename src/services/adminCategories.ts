import API from "@/services/api";

// GET ALL
export const getAllCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};

// CREATE
export const createCategory = async (data: any) => {
  const res = await API.post("/categories", data);
  return res.data;
};

// GET SINGLE
export const getCategoryById = async (id: string) => {
  const res = await API.get(`/categories/${id}`);
  return res.data;
};

// UPDATE
export const updateCategory = async (id: string, data: any) => {
  const res = await API.put(`/categories/${id}`, data);
  return res.data;
};

// DELETE
export const deleteCategory = async (id: string) => {
  const res = await API.delete(`/categories/${id}`);
  return res.data;
};
