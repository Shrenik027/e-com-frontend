import API from "@/services/api";

export const getAllShippingMethodsAdmin = async () => {
  const res = await API.get("/shipping-methods/admin/all");
  return res.data;
};

export const createShippingMethod = async (data: any) => {
  const res = await API.post("/shipping-methods", data);
  return res.data;
};

export const updateShippingMethod = async (id: string, data: any) => {
  const res = await API.put(`/shipping-methods/${id}`, data);
  return res.data;
};

export const deleteShippingMethod = async (id: string) => {
  const res = await API.delete(`/shipping-methods/${id}`);
  return res.data;
};
