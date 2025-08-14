import React, { useContext, useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import CryptoJS from "crypto-js";
import { getCookie } from "cookies-next";

// Material-UI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

//all user login
const navItemsLogin = [
  { label: "greenTAG", path: "/greentag" },
  { label: "greenTAG list", path: "/greentag/list" },
  { label: "greenTAG search", path: "/greentag/search" },
  { label: "greenTAG stock take", path: "/greentag/stock" },
  { label: "Room Reservation", path: "/reservation" },
  { label: "Audit Behaviour", path: "/auditBehaviours" },
  { label: "Add Audit Behaviour & Near Miss", path: "/auditBehaviours/add2" },
  { label: "Audit GMP", path: "/gmp" },
  { label: "Add GMP", path: "/gmp/addGMP" },
  { label: "History Coach", path: "/coach/index" },
  { label: "Add Coach", path: "/coach/add" },
  { label: "PSG Initiaton", path: "/psg" },
  { label: "PSG Project", path: "/account/dashboard" },
  { label: "greenSHIELD", path: "/greenshield/list" },
  // Add more items as needed
];

//super user
const navItemsLogin3 = [
  { label: "Add Project", path: "/events/add" },
  { label: "Dashboard", path: "/account/dashboard" },
  { label: "Loss Filling", path: "/loss" },
  { label: "Loss Processing", path: "/loss/indexP" },
  { label: "Input siQma Material", path: "/siqma" },
  { label: "Rekap siQma", path: "/siqma/list" },
  { label: "Input siQma-Milk #1", path: "/siqma/indexMilk" },
  { label: "Input siQma-Milk #2", path: "/siqma/addMilk" },
  { label: "Edit Reservation", path: "/reservation/edit" },
  { label: "List Reservation", path: "/reservation/list" },

  // { label: "greenTAG", path: "/greentag" },
  // { label: "greenTAG list", path: "/greentag/list" },
  // { label: "greenTAG search", path: "/greentag/search" },
  // { label: "greenTAG stock take", path: "/greentag/stock" },
  // { label: "Room Reservation", path: "/reservation" },
  // { label: "Audit Behaviour", path: "/auditBehaviours" },
  // { label: "Add Audit Behaviour & Near Miss", path: "/auditBehaviours/add2" },
  // { label: "Audit GMP", path: "/gmp" },
  // { label: "Add GMP", path: "/gmp/addGMP" },
  // { label: "PSG Initiaton", path: "/psg" },
  // Add more items as needed
];

//loss filling
const navItemsLogin4 = [
  // { label: "Add Project", path: "/events/add" },
  // { label: "Dashboard", path: "/account/dashboard" },
  { label: "Loss Filling", path: "/loss" },
  { label: "Loss Processing", path: "/loss/indexP" },
  // { label: "Input siQma Material", path: "/siqma" },
  // { label: "Rekap siQma", path: "/siqma/list" },
  // { label: "Input siQma-Milk #1", path: "/siqma/indexMilk" },
  // { label: "Input siQma-Milk #2", path: "/siqma/addMilk" },
  // { label: "Edit Reservation", path: "/reservation/edit" },
  // { label: "List Reservation", path: "/reservation/list" },
  // { label: "greenTAG", path: "/greentag" },
  // { label: "greenTAG list", path: "/greentag/list" },
  // { label: "greenTAG search", path: "/greentag/search" },
  // { label: "greenTAG stock take", path: "/greentag/stock" },
  // { label: "Room Reservation", path: "/reservation" },
  // { label: "Audit Behaviour", path: "/auditBehaviours" },
  // { label: "Add Audit Behaviour & Near Miss", path: "/auditBehaviours/add2" },
  // { label: "Audit GMP", path: "/gmp" },
  // { label: "Add GMP", path: "/gmp/addGMP" },
  // { label: "PSG Initiaton", path: "/psg" },
  // Add more items as needed
];

//siqma
const navItemsLogin5 = [
  // { label: "Add Project", path: "/events/add" },
  // { label: "Dashboard", path: "/account/dashboard" },
  // { label: "Loss Filling", path: "/loss" },
  // { label: "Loss Processing", path: "/loss/indexP" },
  { label: "Input siQma Material", path: "/siqma" },
  { label: "Rekap siQma", path: "/siqma/list" },
  { label: "Input siQma-Milk #1", path: "/siqma/indexMilk" },
  { label: "Input siQma-Milk #2", path: "/siqma/addMilk" },
  // { label: "Edit Reservation", path: "/reservation/edit" },
  // { label: "List Reservation", path: "/reservation/list" },
  // { label: "greenTAG", path: "/greentag" },
  // { label: "greenTAG list", path: "/greentag/list" },
  // { label: "greenTAG search", path: "/greentag/search" },
  // { label: "greenTAG stock take", path: "/greentag/stock" },
  // { label: "Room Reservation", path: "/reservation" },
  // { label: "Audit Behaviour", path: "/auditBehaviours" },
  // { label: "Add Audit Behaviour & Near Miss", path: "/auditBehaviours/add2" },
  // { label: "Audit GMP", path: "/gmp" },
  // { label: "Add GMP", path: "/gmp/addGMP" },
  // { label: "PSG Initiaton", path: "/psg" },
  // Add more items as needed
];

//reservation HR
const navItemsLogin6 = [
  // { label: "Add Project", path: "/events/add" },
  // { label: "Dashboard", path: "/account/dashboard" },
  // { label: "Loss Filling", path: "/loss" },
  // { label: "Loss Processing", path: "/loss/indexP" },
  // { label: "Input siQma Material", path: "/siqma" },
  // { label: "Rekap siQma", path: "/siqma/list" },
  // { label: "Input siQma-Milk #1", path: "/siqma/indexMilk" },
  // { label: "Input siQma-Milk #2", path: "/siqma/addMilk" },
  { label: "Edit Reservation", path: "/reservation/edit" },
  { label: "List Reservation", path: "/reservation/list" },
  // { label: "greenTAG", path: "/greentag" },
  // { label: "greenTAG list", path: "/greentag/list" },
  // { label: "greenTAG search", path: "/greentag/search" },
  // { label: "greenTAG stock take", path: "/greentag/stock" },
  // { label: "Room Reservation", path: "/reservation" },
  // { label: "Audit Behaviour", path: "/auditBehaviours" },
  // { label: "Add Audit Behaviour & Near Miss", path: "/auditBehaviours/add2" },
  // { label: "Audit GMP", path: "/gmp" },
  // { label: "Add GMP", path: "/gmp/addGMP" },
  // { label: "PSG Initiaton", path: "/psg" },
  // Add more items as needed
];

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // This function will be called when the drawer needs to be closed
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const handleHRGARedirect = () => {
    if (!user) {
      alert("User belum login!");
      return;
    }

    let identityData = null;

    try {
      const cookieData = getCookie("identityData");
      if (cookieData) {
        identityData = JSON.parse(cookieData).data || null;
      }
    } catch (e) {
      identityData = null;
    }

    const payload = JSON.stringify({
      username: user.username,
      email: user.email,
      role: user.role?.id || "",
      ...identityData,
    });
    const secretKey = "?asdasdASE@fdglhkdfhJJLakasd$%"; // Ganti dengan key yang aman
    const encrypted = CryptoJS.AES.encrypt(payload, secretKey).toString();
    const targetUrl = `http://localhost:3000/?id=${encodeURIComponent(
      encrypted
    )}`;
    window.location.href = targetUrl;
  };

  const navItemsDesktop = [
    { label: "greenTAG", path: "/greentag" },
    { label: "Room Reservation", path: "/reservation" },
    { label: "Audit Behaviour", path: "/auditBehaviours/add2" },
    { label: "Add GMP", path: "/gmp/addGMP" },
    { label: "PSG Initiaton", path: "/psg" },
    { label: "Coach", path: "/coach/add" },
    { label: "HRGA", onClick: handleHRGARedirect },
    // Add more items as needed
  ];

  const drawer = (
    <List>
      {user &&
        user.role.id == 3 &&
        navItemsLogin3.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      {user &&
        user.role.id == 4 &&
        navItemsLogin4.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      {user &&
        user.role.id == 5 &&
        navItemsLogin5.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      {user &&
        user.role.id == 6 &&
        navItemsLogin6.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      {user &&
        navItemsLogin.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      {!user && (
        <ListItem disablePadding>
          <ListItemButton component="a" href="/account/login">
            <FaSignInAlt /> <span>Login</span>
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar
        style={{
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          justifyContent: "space-between", // Ensures elements are spaced out
          // height: "150vh",
          backgroundImage: `url(./images/header_bg.png)`,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
          // sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Image src="/images/gfi.png" width={50} height={50} alt="logo" />
        </Link>
        <a
          // target="_blank"
          href="http://great.greenfieldsdairy.com/"
          style={{ color: "green" }}
        >
          <b style={{ fontSize: 30, color: "green" }}>.R.E.A.T</b>
        </a>

        <div className={styles.desktopMenu}>
          <List sx={{ display: "flex", flexDirection: "row", padding: 0 }}>
            {user &&
              navItemsDesktop.map((item) => (
                <ListItem key={item.label} disablePadding>
                  {item.onClick ? (
                    <ListItemButton
                      sx={{ textAlign: "center" }}
                      onClick={item.onClick}
                    >
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  ) : (
                    <Link href={item.path} passHref>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
              ))}
            {!user && (
              <ListItem disablePadding>
                <Link href="/account/login" passHref>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <FaSignInAlt />
                    <span style={{ marginLeft: 8 }}>Login</span>
                  </ListItemButton>
                </Link>
              </ListItem>
            )}
          </List>
        </div>
        <div style={{ flexGrow: 1 }} />
        {user && (
          <button onClick={() => logout()} className="btn-secondary btn-icon">
            <FaSignOutAlt /> {user.email.split("@")[0]}
          </button>
        )}
      </Toolbar>
      <Drawer
        variant="temporary"
        // variant="persistent"
        open={mobileOpen}
        // onClose={handleDrawerToggle}
        onClose={handleDrawerClose} // This will handle closing the drawer when clicking outside
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            // The following ensures the list items are stacked vertically
            "& .MuiList-root": {
              flexDirection: "column",
            },
          },
        }}
        // sx={{
        //   display: { xs: "block", sm: "none" },
        //   "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        // }}
      >
        {drawer}
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
            <Image alt="greendazh" src="/anal.png" width={40} height={40} />
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
      </Drawer>
    </AppBar>
  );
}
