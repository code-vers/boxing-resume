import { createContext, useContext, useState } from "react";
import { ROLES, type Role } from "../constants/roles";
import { DEMO_USERS } from "../constants/demo-users";

interface AuthContextType {
  user: (typeof DEMO_USERS)[0] | null;
  login: (email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
});

const normalizeRole = (role: unknown): Role => {
  if (role === ROLES.USER || role === "user" || role === "User")
    return ROLES.USER;
  if (role === ROLES.MANAGER || role === "manager" || role === "Manager")
    return ROLES.MANAGER;
  if (role === ROLES.ADMIN || role === "admin" || role === "Admin")
    return ROLES.ADMIN;
  return ROLES.USER;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(typeof DEMO_USERS)[0] | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const saved = localStorage.getItem("auth-user");
      if (!saved) return null;

      const parsed = JSON.parse(saved) as (typeof DEMO_USERS)[0];
      return {
        ...parsed,
        role: normalizeRole(parsed.role),
      };
    } catch {
      return null;
    }
  });
  const isLoading = false;

  const login = (email: string) => {
    const found = DEMO_USERS.find((u) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem("auth-user", JSON.stringify(found));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth-user");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
