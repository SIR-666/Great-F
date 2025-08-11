import React, { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import Grid from "@mui/material/Grid";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // height: "150vh",
          backgroundImage: `url(./images/header_bg.png)`,
        }}
      >
        <Link href="/">
          <Image src="/images/gfi.png" width={50} height={50} />
        </Link>
        {/* <Link href="/">
          <a>.R.E.A.T</a>
        </Link> */}
        <a
          // target="_blank"
          href="http://great.greenfieldsdairy.com/"
          style={{ color: "green" }}
        >
          <b style={{ fontSize: 30, color: "green" }}>.R.E.A.T</b>
        </a>
      </div>

      {/* <Search /> */}
      {/* <Image src="/images/indo5.png" width={50} height={50} /> */}

      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundImage: `url(./images/header_bg.png)`,
          // height: "100vh",
          // width: "125vh",
          // border: "1px solid",
        }}
      >
        <ul>
          {/* super user */}
          {user && user.role.id == 3 ? (
            //psg user
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Project</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/loss">
                  <a>Loss Filling</a>
                </Link>
              </li>
              <li>
                <Link href="/loss/indexP">
                  <a>Loss Processing</a>
                </Link>
              </li>
              <li>
                <Link href="/siqma">
                  <a>Input siQma Material</a>
                </Link>
              </li>
              <li>
                <Link href="/siqma/indexMilk">
                  <a>Input siQma-Milk</a>
                </Link>
              </li>
              <li>
                <Link href="/siqma/list">
                  <a>Rekap siQma</a>
                </Link>
              </li>
            </>
          ) : null}

          {user && user.role.id == 4 ? (
            //loss filling
            <>
              <li>
                <Link href="/loss">
                  <a>Loss Filling</a>
                </Link>
              </li>
              <li>
                <Link href="/loss/indexP">
                  <a>Loss Processing</a>
                </Link>
              </li>
            </>
          ) : null}

          {user && user.role.id == 5 ? (
            //siqma
            <>
              <li>
                <Link href="/siqma">
                  <a>Input siQma Material</a>
                </Link>
              </li>
              <li>
                <Link href="/siqma/list">
                  <a>Rekap siQma</a>
                </Link>
              </li>
              <li>
                <Link href="/siqma/indexMilk">
                  <a>Input siQma-Milk #1</a>
                </Link>
              </li>
              <li>
                <Link href="/siqma/addMilk">
                  <a>Input siQma-Milk #2</a>
                </Link>
              </li>
            </>
          ) : null}

          {user && user.role.id == 6 ? (
            //hr
            <>
              <li>
                <Link href="/reservation/edit">
                  <a>Edit Reservation</a>
                </Link>
              </li>
              <li>
                <Link href="/reservation/list">
                  <a>List Reservation</a>
                </Link>
              </li>
            </>
          ) : null}

          {user ? (
            // If logged in
            <>
              <li>
                <Link href="/greentag">
                  <a>greenTAG</a>
                </Link>
              </li>
              <li>
                <Link href="/greentag/list">
                  <a>greenTAGs list</a>
                </Link>
              </li>
              <li>
                <Link href="/reservation">
                  <a>Room Reservation</a>
                </Link>
              </li>
              <li>
                <Link href="/auditBehaviours">
                  <a>Audit Behaviour</a>
                </Link>
              </li>
              <li>
                <Link href="/auditBehaviours/add2">
                  <a>Add Audit Behaviour & Near Miss</a>
                </Link>
              </li>

              <li>
                <Link href="/gmp">
                  <a>Audit GMP</a>
                </Link>
              </li>
              <li>
                <Link href="/gmp/addGMP">
                  <a>Add GMP</a>
                </Link>
              </li>

              <li>
                <Link href="/psg">
                  <a>PSG Initiaton</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="btn-secondary btn-icon"
                >
                  <FaSignOutAlt /> {user.email.split("@")[0]}
                </button>
              </li>
            </>
          ) : (
            // If logged out
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn-secondary btn-icon">
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(./images/header_bg.png)`,
          // height: "100vh",
        }}
      >
        {/* <img height={40} src={"./anal.png"} alt="greendazh" /> */}
        <Link href="/">
          <Image src="/anal.png" width={40} height={40} />
        </Link>
        <a
          target="_blank"
          href="http://greendazh.greenfieldsdairy.com/"
          style={{ color: "#32CD32" }}
          rel="noopener noreferrer"
        >
          &nbsp;&nbsp;
          <b style={{ fontSize: 30, color: "#32CD32" }}>green.</b>DAZH
        </a>
      </div>
    </header>
  );
}
