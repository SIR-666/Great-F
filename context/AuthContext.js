import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";
import { API_URL, API_URL2 } from "@/config/index";
import { setCookie } from "cookies-next";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const forgotPassword = async (email) => {
    const res = await fetch(`${API_URL2}/api/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: "Check your email for a reset link",
        icon: "success",
      });
      router.push("/account/login");
    } else {
      setError(data.message);
    }
  };

  const resetPassword = async (password, passwordConfirmation, token) => {
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }
    const res = await fetch(`${API_URL2}/api/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, passwordConfirmation, token }),
    });
    const data = await res.json();
    if (res.ok) {
      Swal.fire({
        title: "Success",
        text: "Password reset successful",
        icon: "success",
      });
      router.push("/account/login");
    } else {
      setError(data.message);
    }
  };

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
      router.push("/");
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
      router.push("/");
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
    <AuthContext.Provider
      value={{
        user,
        error,
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
