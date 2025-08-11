import cookie from "cookie";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;
    // console.log(req.body);
    const strapiRes = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await strapiRes.json();
    // if (data.statusCode === 400) {
    //   // alert("You have entered an invalid username OR password");
    //   console.log(data.statusCode);
    //   res.status(data.statusCode);
    // }
    // console.log(data.user.email); //email yg didapat setelah login
    // console.log(data.jwt); //jwt yg didapat setelah login

    if (strapiRes.ok) {
      // Set Cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          // secure: process.env.NODE_ENV !== 'development', //https
          maxAge: 60 * 60 * 24 * 30, // 30 hari
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        // .json({ message: data.message[0].messages[0].message });
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
