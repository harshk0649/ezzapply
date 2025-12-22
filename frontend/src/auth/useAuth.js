import { loginApi, registerApi } from "../api/auth.api";

// ================= LOGIN =================
export const login = async (email, password) => {
  const res = await loginApi(email, password);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: res.data.id,
      email: res.data.email,
      roles: res.data.roles,
    })
  );

  return res.data;
};

// ================= REGISTER =================
export const register = async (name, email, password, role) => {
  return registerApi(name, email, password, role);
};

// ================= LOGOUT =================
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ================= HELPERS =================
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const isRecruiter = () => {
  const user = getUser();
  return user?.roles?.includes("ROLE_RECRUITER");
};
