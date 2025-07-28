import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [resetToken, setResetToken] = useState("");

  const { resetPassword, error } = useContext(AuthContext);

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(password, passwordConfirmation, resetToken);
  };

useEffect(() => {
    // Ambil token dari query parameter URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
        setResetToken(token);
    }
}, []);

return (
    <Layout title="Reset Password">
        <div className={styles.auth}>
            <h1>Reset Password</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Confirm Password</label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </div>
                <input
                    type="hidden"
                    id="token"
                    value={resetToken}
                    readOnly
                />
                <input type="submit" value="Reset Password" className="btn" />
            </form>

            <p>
                Remembered your password? <Link href="/account/login">Login</Link>
            </p>
        </div>
    </Layout>
);
}
