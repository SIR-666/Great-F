import cookie from "cookie";
import { API_URL, API_URL2 } from "@/config/index";
import Swal from "sweetalert2";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const strapiRes = await fetch(`${API_URL2}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // Set Cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          // secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 30, // 1 month
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
      Swal.fire({
        title: "Success",
        text: "Registration successful!",
        icon: "success",
      });
    } else {
      let errorMsg = "Registration failed";
      if (Array.isArray(data.message) && data.message[0]?.messages) {
        errorMsg = data.message[0].messages[0]?.message || errorMsg;
      } else if (typeof data.message === "string") {
        errorMsg = data.message;
      } else if (data.message) {
        errorMsg = JSON.stringify(data.message);
      }
      res.status(data.statusCode || 400).json({ message: errorMsg });
      Swal.fire({
        title: "Error",
        text: errorMsg,
        icon: "error",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
    Swal.fire({
      title: "Error",
      text: `Method ${req.method} not allowed`,
      icon: "error",
    });
  }
};
