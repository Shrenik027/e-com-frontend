import API from "./api";

export const getShippingMethods = async () => {
  const res = await API.get("/shipping-methods");
  return res.data.methods || res.data;
};
