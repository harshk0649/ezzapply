import { loginApi, registerApi } from "../api/auth.api";

export const login = async (email, password) => {
  const res = await loginApi(email, password);

  // If backend returns JWT later, store it
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

export const register = async (name, email, password, role) => {
  return registerApi(name, email, password, role);
};

export const logout = () => {
  localStorage.clear();
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
