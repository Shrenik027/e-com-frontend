import API from "@/services/api";

export const getAllOrders = async () => {
  const res = await API.get("/orders"); // admin-only
  return res.data;
};

export const getOrderByIdAdmin = async (orderId: string) => {
  const res = await API.get(`/admin/orders/${orderId}`);
  return res.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const res = await API.put(`/admin/orders/${orderId}/status`, {
    status,
  });
  return res.data;
};
