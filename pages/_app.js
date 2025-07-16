/* eslint-disable react/display-name */

import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <h7> v: 1.0.0 </h7>
//       <Component {...pageProps} />
//     </>
//   );
// }

// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <Component {...pageProps} />
//     </>
//   );
// }

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
