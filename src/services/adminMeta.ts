import API from "@/services/api";

export const fetchCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};

export const fetchBrands = async () => {
  const res = await API.get("/brands");
  return res.data;
};
