import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.sub,
        role: decoded.role,
      });
    }
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);

    const decoded = jwtDecode(res.data.token);
    setUser({
      id: decoded.sub,
      role: decoded.role,
    });
  };

  // 📝 REGISTER
  const register = async (fullName, email, password, role) => {
    await axios.post("/api/auth/register", {
      fullName,
      email,
      password,
      role: role === "recruiter" ? "RECRUITER" : "JOB_SEEKER",
    });
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ THIS EXPORT IS WHAT WAS MISSING / MISUSED
export const useAuth = () => useContext(AuthContext);
