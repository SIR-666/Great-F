import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nik, setNik] = useState("");

  const { login, error, setError } = useContext(AuthContext);
  const [localNikError, setLocalNikError] = useState(null);

  useEffect(() => {
    if (error) {
      if (typeof error === "string") {
        toast.error(error);
      } else if (error && error.message) {
        toast.error(error.message);
      }
      // Reset error agar toast bisa muncul lagi jika error sama terjadi
      if (typeof error !== "undefined" && error !== null) {
        // Panggil setError dari context jika tersedia
        if (typeof setError === "function") setError(null);
      }
    }
    if (localNikError) {
      toast.error(localNikError);
      setLocalNikError(null);
    }
  }, [error, localNikError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Cek NIK dulu sebelum login
    if (!nik) {
      setLocalNikError("NIK wajib diisi");
      return;
    }
    // Panggil login, jika validateIdentity gagal, error akan di-set di context
    await login({ nik, email, password });
  };

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nik">NIK</label>
            <input
              type="text"
              id="nik"
              required
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Link href="/account/forgotPassword">Forgot Password?</Link>
          </div>
          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Dont have an account? <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
}
