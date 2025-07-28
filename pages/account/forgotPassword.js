import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { forgotPassword, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <Layout title="Forgot Password">
      <div className={styles.auth}>
        <h1>Forgot Password</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>

        <p>
          Remembered your password? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
}