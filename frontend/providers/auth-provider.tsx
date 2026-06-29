import { createContext, useContext, useState, useEffect } from "react";
import { ROLES, type Role } from "../constants/roles";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

const normalizeRole = (role: unknown): Role => {
  if (role === ROLES.USER || role === "user" || role === "User" || role === "USER")
    return ROLES.USER;
  if (role === ROLES.MANAGER || role === "manager" || role === "Manager" || role === "MANAGER")
    return ROLES.MANAGER;
  if (role === ROLES.ADMIN || role === "admin" || role === "Admin" || role === "ADMIN")
    return ROLES.ADMIN;
  return ROLES.USER;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("auth-user");
      if (saved) {
        const parsed = JSON.parse(saved) as AuthUser;
        setUser({
          ...parsed,
          role: normalizeRole(parsed.role),
        });
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData: AuthUser) => {
    const formattedUser = { ...userData, role: normalizeRole(userData.role) };
    setUser(formattedUser);
    localStorage.setItem("auth-user", JSON.stringify(formattedUser));
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
