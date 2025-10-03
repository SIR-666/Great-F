import Head from "next/head";
import { useRouter } from "next/router";
import styles from "@/styles/LayoutHomePage.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./Showcase";
import React from "react";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div>
      {" "}
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Showcase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "G.R.E.A.T Greenfields| Greenfields Reporting and Analysis Tools",
  description: "Greenfields Reporting and Analysis Tool",
  keywords: "Greenfields Reporting and Analysis Tool",
};
