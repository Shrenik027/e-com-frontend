import API from "@/services/api";

/* ======================
   API CALLS (unchanged)
====================== */

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

/* ======================
   AUTH STATE HELPERS
====================== */

export type AuthUser = {
  name?: string;
  role?: "user" | "admin";
};

export const getAuth = () => {
  if (typeof window === "undefined") {
    return {
      isLoggedIn: false,
      user: null,
      isAdmin: false,
    };
  }

  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  const user: AuthUser | null = userRaw ? JSON.parse(userRaw) : null;

  return {
    isLoggedIn: !!token,
    user,
    isAdmin: user?.role === "admin",
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
