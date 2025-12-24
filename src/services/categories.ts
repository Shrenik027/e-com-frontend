import API from "@/services/api";

export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data.categories || [];
};
