import API from "@/services/api";

export const fetchAdminDashboard = async () => {
  const res = await API.get("/admin/dashboard");
  return res.data;
};
