/* eslint-disable react/display-name */

import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";
import "../styles/tailwind.css"; // Import Tailwind CSS

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
      <div id="tailwind-root">
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
