import { useEffect, useContext } from "react";
import { getCookie } from "cookies-next";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function RefreshIdentity() {
  const { validateIdentity, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const identityRaw = getCookie("identityData");
    if (!identityRaw) {
      logout();
      router.push("/account/login");
      return;
    }
    let identity;
    try {
      identity = JSON.parse(identityRaw);
    } catch {
      logout();
      router.push("/account/login");
      return;
    }
    const nik = identity?.data?.employee_no;
    if (!nik) {
      logout();
      router.push("/account/login");
      return;
    }
    const refreshIdentity = async () => {
      await validateIdentity(nik);
      console.log("identity refreshed");
    };
    refreshIdentity();
  }, [validateIdentity, logout, router]);

  return null; 
}