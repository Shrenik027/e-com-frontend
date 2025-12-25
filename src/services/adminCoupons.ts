import API from "@/services/api";

export const getAllCoupons = async () => {
  const res = await API.get("/coupons");
  return res.data;
};

export const createCoupon = async (data: any) => {
  const res = await API.post("/coupons", data);
  return res.data;
};

export const deleteCoupon = async (couponId: string) => {
  const res = await API.delete(`/coupons/${couponId}`);
  return res.data;
};
