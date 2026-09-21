import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "@/types";
import { mockUsers } from "@/data/mockData";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (data: Partial<User> & { password: string }) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  demoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("agrismart_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("agrismart_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("agrismart_user");
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    // Check localStorage users
    const customUsers: User[] = JSON.parse(localStorage.getItem("agrismart_custom_users") || "[]");
    const custom = customUsers.find((u) => u.email === email && u.password === password);
    if (custom) {
      setUser(custom);
      return true;
    }
    return false;
  };

  const register = (data: Partial<User> & { password: string }): boolean => {
    const exists = mockUsers.find((u) => u.email === data.email);
    if (exists) return false;
    const customUsers: User[] = JSON.parse(localStorage.getItem("agrismart_custom_users") || "[]");
    const newUser: User = {
      id: `u_${Date.now()}`,
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      password: data.password,
      role: "farmer",
      location: data.location || "",
      farmSize: data.farmSize,
    };
    customUsers.push(newUser);
    localStorage.setItem("agrismart_custom_users", JSON.stringify(customUsers));
    setUser(newUser);
    return true;
  };

  const logout = () => setUser(null);

  const demoLogin = () => {
    setUser(mockUsers[0]);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, demoLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
