import API from "@/services/api";

export const getAllUsers = async () => {
  const res = await API.get("/admin/users");
  return res.data;
};

export const toggleUserStatus = async (userId: string) => {
  const res = await API.put(`/admin/users/${userId}/status`);
  return res.data;
};

export const updateUserRole = async (
  userId: string,
  role: "user" | "admin"
) => {
  const res = await API.put(`/admin/users/${userId}/role`, { role });
  return res.data;
};

export const getUserById = async (userId: string) => {
  const res = await API.get(`/admin/users/${userId}`);
  return res.data;
};

export const getUserOrders = async (userId: string) => {
  const res = await API.get(`/admin/users/${userId}/orders`);
  return res.data;
};
