import API from "@/services/api";

export const getBrands = async () => {
  const res = await API.get("/brands");
  return res.data.brands || [];
};
