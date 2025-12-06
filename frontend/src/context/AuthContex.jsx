// src/contexts/AuthContext.jsx
import React, { createContext, useState } from "react";
import { apiFetch } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  async function login(email, password) {
    const res = await apiFetch("/auth/login", { method: "POST", body: { email, password }, withAuth: false });
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  function hasRole(role) {
    if (!user) return false;
    // tu backend usa enums; aquí comparamos en mayúsculas
    return user.rol === role || user.rol === "ADMIN";
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
