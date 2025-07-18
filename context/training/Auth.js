import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";
import { setCookie } from "cookies-next";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  // Register user
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setCookie("username", data.user.username);
      setCookie("role", data.user.role.id);
      router.push("/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setCookie("username", data.user.username);
      setCookie("role", data.user.role.id);
      console.log(data.user);
      console.log(data.user.role.id);
      // router.push("/account/dashboard");
      router.push("/training/dashboard-user");
    } else {
      // console.log(data);
      setError(data);
      // setError(null);
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      setCookie("username", null);
      setCookie("role", null);
      router.push("/training");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setCookie("username", data.user.username);
      setCookie("role", data.user.role.id);
    } else {
      setUser(null);
      setCookie("username", null);
      setCookie("role", null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
