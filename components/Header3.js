import React, { useContext, useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import Grid from "@mui/material/Grid";

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

const navItemsDesktop = [
  { label: "greenTAG", path: "/greentag" },
  { label: "Room Reservation", path: "/reservation" },
  { label: "Audit Behavior", path: "/auditBehaviours/add2" },
  { label: "Add GMP", path: "/gmp/addGMP" },
  // { label: "PSG Initiaton", path: "/psg" },
  // Add more items as needed
];

//all user login
const navItemsLogin = [
  { label: "greenTAG", path: "/greentag" },
  { label: "greenTAGs list", path: "/greentag/list" },
  { label: "Room Reservation", path: "/reservation" },
  { label: "Audit Behavior Based Safety", path: "/auditBehaviours" },
  { label: "Add Behavior Based Safety", path: "/auditBehaviours/add2" },
  { label: "Audit GMP", path: "/gmp" },
  { label: "Add GMP", path: "/gmp/addGMP" },
  // { label: "PSG Initiaton", path: "/psg" },
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
  // { label: "greenTAGs list", path: "/greentag/list" },
  // { label: "Room Reservation", path: "/reservation" },
  // { label: "Audit Behavior", path: "/auditBehaviours" },
  // { label: "Add Audit Behavior & Near Miss", path: "/auditBehaviours/add2" },
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
  // { label: "greenTAGs list", path: "/greentag/list" },
  // { label: "Room Reservation", path: "/reservation" },
  // { label: "Audit Behavior", path: "/auditBehaviours" },
  // { label: "Add Audit Behavior & Near Miss", path: "/auditBehaviours/add2" },
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
  // { label: "greenTAGs list", path: "/greentag/list" },
  // { label: "Room Reservation", path: "/reservation" },
  // { label: "Audit Behavior", path: "/auditBehaviours" },
  // { label: "Add Audit Behavior & Near Miss", path: "/auditBehaviours/add2" },
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
  // { label: "greenTAGs list", path: "/greentag/list" },
  // { label: "Room Reservation", path: "/reservation" },
  // { label: "Audit Behavior", path: "/auditBehaviours" },
  // { label: "Add Audit Behavior & Near Miss", path: "/auditBehaviours/add2" },
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
                  <Link href={item.path} passHref>
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </Link>
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
      </Drawer>
    </AppBar>
  );

  // return (
  //   <header className={styles.header}>
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         // height: "150vh",
  //         backgroundImage: `url(./images/header_bg.png)`,
  //       }}
  //     >
  //       <Link href="/">
  //         <Image src="/images/gfi.png" width={50} height={50} />
  //       </Link>
  //       {/* <Link href="/">
  //         <a>.R.E.A.T</a>
  //       </Link> */}
  //       <a
  //         // target="_blank"
  //         href="http://great.greenfieldsdairy.com/"
  //         style={{ color: "green" }}
  //       >
  //         <b style={{ fontSize: 30, color: "green" }}>.R.E.A.T</b>
  //       </a>
  //     </div>

  //     {/* <Search /> */}
  //     {/* <Image src="/images/indo5.png" width={50} height={50} /> */}

  //     <nav
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "flex-end",
  //         backgroundImage: `url(./images/header_bg.png)`,
  //         // height: "100vh",
  //         // width: "125vh",
  //         // border: "1px solid",
  //       }}
  //     >
  //       <ul>
  //         {/* super user */}
  //         {user && user.role.id == 3 ? (
  //           //psg user
  //           <>
  //             <li>
  //               <Link href="/events/add">
  //                 <a>Add Project</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/account/dashboard">
  //                 <a>Dashboard</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/loss">
  //                 <a>Loss Filling</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/loss/indexP">
  //                 <a>Loss Processing</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/siqma">
  //                 <a>Input siQma Material</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/siqma/indexMilk">
  //                 <a>Input siQma-Milk</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/siqma/list">
  //                 <a>Rekap siQma</a>
  //               </Link>
  //             </li>
  //           </>
  //         ) : null}

  //         {user && user.role.id == 4 ? (
  //           //loss filling
  //           <>
  //             <li>
  //               <Link href="/loss">
  //                 <a>Loss Filling</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/loss/indexP">
  //                 <a>Loss Processing</a>
  //               </Link>
  //             </li>
  //           </>
  //         ) : null}

  //         {user && user.role.id == 5 ? (
  //           //siqma
  //           <>
  //             <li>
  //               <Link href="/siqma">
  //                 <a>Input siQma Material</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/siqma/list">
  //                 <a>Rekap siQma</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/siqma/indexMilk">
  //                 <a>Input siQma-Milk #1</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/siqma/addMilk">
  //                 <a>Input siQma-Milk #2</a>
  //               </Link>
  //             </li>
  //           </>
  //         ) : null}

  //         {user && user.role.id == 6 ? (
  //           //hr
  //           <>
  //             <li>
  //               <Link href="/reservation/edit">
  //                 <a>Edit Reservation</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/reservation/list">
  //                 <a>List Reservation</a>
  //               </Link>
  //             </li>
  //           </>
  //         ) : null}

  //         {user ? (
  //           // If logged in
  //           <>
  //             <li>
  //               <Link href="/greentag">
  //                 <a>greenTAG</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/greentag/list">
  //                 <a>greenTAGs list</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/reservation">
  //                 <a>Room Reservation</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/auditBehaviours">
  //                 <a>Audit Behavior</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/auditBehaviours/add2">
  //                 <a>Add Audit Behavior & Near Miss</a>
  //               </Link>
  //             </li>

  //             <li>
  //               <Link href="/gmp">
  //                 <a>Audit GMP</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link href="/gmp/addGMP">
  //                 <a>Add GMP</a>
  //               </Link>
  //             </li>

  //             <li>
  //               <Link href="/psg">
  //                 <a>PSG Initiaton</a>
  //               </Link>
  //             </li>
  //             <li>
  //               <button
  //                 onClick={() => logout()}
  //                 className="btn-secondary btn-icon"
  //               >
  //                 <FaSignOutAlt /> {user.email.split("@")[0]}
  //               </button>
  //             </li>
  //           </>
  //         ) : (
  //           // If logged out
  //           <>
  //             <li>
  //               <Link href="/account/login">
  //                 <a className="btn-secondary btn-icon">
  //                   <FaSignInAlt /> Login
  //                 </a>
  //               </Link>
  //             </li>
  //           </>
  //         )}
  //       </ul>
  //     </nav>

  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         backgroundImage: `url(./images/header_bg.png)`,
  //         // height: "100vh",
  //       }}
  //     >
  //       {/* <img height={40} src={"./anal.png"} alt="greendazh" /> */}
  //       <Link href="/">
  //         <Image src="/anal.png" width={40} height={40} />
  //       </Link>
  //       <a
  //         target="_blank"
  //         href="http://greendazh.greenfieldsdairy.com/"
  //         style={{ color: "#32CD32" }}
  //         rel="noopener noreferrer"
  //       >
  //         &nbsp;&nbsp;
  //         <b style={{ fontSize: 30, color: "#32CD32" }}>green.</b>DAZH
  //       </a>
  //     </div>
  //   </header>
  // );
}
