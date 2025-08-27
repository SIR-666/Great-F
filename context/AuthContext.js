import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";
import { API_URL, API_URL2, API_URL3 } from "@/config/index";
import { setCookie, getCookie } from "cookies-next";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  // Helper function untuk validate identity berdasarkan NIK
  // const validateIdentity = async (nik) => {
  //   console.log("🔍 validateIdentity called with NIK:", nik);
  //   console.log("🌐 API_URL3:", API_URL3);
  //   console.log("📡 Full URL:", `${API_URL3}/api/validate-identity`);

  //   try {
  //     const res = await fetch(`${API_URL3}/api/validate-identity`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ nik }),
  //     });

  //     console.log("Response status:", res.status);
  //     console.log("Response ok:", res.ok);

  //     const data = await res.json();
  //     console.log("Response data:", data);

  //     if (res.ok) {
  //       console.log("Saving to sessionStorage:", data);
  //       sessionStorage.setItem("identityData", JSON.stringify(data));

  //       const stored = sessionStorage.getItem("identityData");
  //       console.log("Verification - stored data:", stored);

  //       return data;
  //     } else {
  //       console.error("API Error:", data.message);
  //       setError(data.message);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Network/Fetch Error:", error);
  //     setError("Network error during identity validation");
  //     return null;
  //   }
  // };

  // // Helper function untuk mengambil data karyawan
  // const getIdentityData = (field = null) => {
  //   try {
  //     if (typeof window === 'undefined') {
  //       console.log("getIdentityData called during SSR, returning null");
  //       return null;
  //     }

  //     const data = sessionStorage.getItem("identityData");
  //     if (!data) {
  //       console.log("No identity data in sessionStorage");
  //       return null;
  //     }

  //     const parsedData = JSON.parse(data);
  //     console.log("Parsed identity data:", parsedData);

  //     if (field) {
  //       const fieldValue = parsedData.data?.[field] || null;
  //       console.log(`Field '${field}':`, fieldValue);
  //       return fieldValue;
  //     }

  //     // Return semua data
  //     const result = parsedData.data || null;
  //     console.log("Returning all identity data:", result);
  //     return result;
  //   } catch (error) {
  //     console.error("Error parsing identity data:", error);
  //     return null;
  //   }
  // };

  const validateIdentity = async (nik) => {
    try {
      const res = await fetch(`${API_URL3}/api/validate-identity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nik }),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        console.log("Saving identity data to cookies only:", data);

        setCookie("identityData", JSON.stringify(data), {
          maxAge: 60 * 60 * 24 * 30, // 30 hari
          path: "/",
        });

        const stored = getCookie("identityData");
        console.log("Verification - stored identity data in cookies:", stored);

        return data;
      } else {
        console.error("API Error:", data.message);
        setError(data.message);
        return null;
      }
    } catch (error) {
      console.error("Network/Fetch Error:", error);
      setError("Network error during identity validation");
      return null;
    }
  };

  const getIdentityData = (field = null) => {
    try {
      if (typeof window === "undefined") {
        console.log("getIdentityData called during SSR, returning null");
        return null;
      }

      const cookieData = getCookie("identityData");

      if (!cookieData) {
        console.log("No identity data in cookies");
        return null;
      }

      console.log("Found identity data in cookies:", cookieData);
      const parsedData = JSON.parse(cookieData);
      console.log("Parsed identity data:", parsedData);

      if (field) {
        const fieldValue = parsedData.data?.[field] || null;
        console.log(`Field '${field}':`, fieldValue);
        return fieldValue;
      }

      // Return semua data
      const result = parsedData.data || null;
      console.log("Returning all identity data:", result);
      return result;
    } catch (error) {
      console.error("Error parsing identity data from cookies:", error);
      return null;
    }
  };

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
      let errorMsg = "Registration failed";
      if (typeof data.message === "string") {
        errorMsg = data.message;
      } else if (Array.isArray(data.message) && data.message[0]?.messages) {
        errorMsg = data.message[0].messages[0]?.message || errorMsg;
      } else if (data.message) {
        errorMsg = JSON.stringify(data.message);
      }
      setError(errorMsg);
    }
  };

  // Login user
  const login = async ({ nik, email: identifier, password }) => {
    console.log("Login called with:", { nik, identifier, password: "***" });

    // Validate identity first if nik is provided
    if (nik) {
      console.log("NIK provided, calling validateIdentity...");
      const validationResult = await validateIdentity(nik);
      console.log("Validation result:", validationResult);

      if (!validationResult) {
        console.log("Validation failed, stopping login process");
        return;
      }
    } else {
      console.log("No NIK provided, skipping identity validation");
    }

    console.log("Proceeding with login API call...");
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
      console.log("✅ Login successful:", data.user);
      console.log("👤 User role:", data.user.role.id);
      router.push("/");
    } else {
      console.error("❌ Login failed:", data);
      setError(data);
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
        setError, // expose setError agar bisa diakses di LoginPage
        register,
        login,
        logout,
        forgotPassword,
        resetPassword,
        getIdentityData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
