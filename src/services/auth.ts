import API from "@/services/api";

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};
