"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/me"); // Fetch user details from backend
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
