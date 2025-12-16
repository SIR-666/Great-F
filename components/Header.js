import React, { useContext, useState, useMemo } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
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
import Collapse from "@mui/material/Collapse";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const HEADER_TEXT_COLOR = "#024623ff";
const API_TRAINING =
  process.env.NEXT_PUBLIC_TRAINING_URL || "http://localhost:3000";

// ====== Grouped menu (kategori → submenu) ======
const groupedNav = (user, handleHRGARedirect) => [
  {
    title: "Greentag",
    key: "Greentag",
    items: [
      { label: "greenTAG", path: "/greentag" },
      { label: "greenTAG list", path: "/greentag/list" },
      { label: "greenTAG search", path: "/greentag/search" },
      { label: "greenTAG stock take", path: "/greentag/stock" },
    ],
  },
  {
    title: "Room Reservation",
    key: "RoomReservation",
    items: [
      { label: "Room Reservation", path: "/reservation" },
      ...(user?.role?.id === 6 || user?.role?.id === 3
        ? [{ label: "Edit Reservation", path: "/reservation/edit" }]
        : []),
      ...(user?.role?.id === 6 || user?.role?.id === 3
        ? [{ label: "List Reservation", path: "/reservation/list" }]
        : []),
    ],
  },
  ...(user?.role?.id === 6 || user?.role?.id === 8
    ? [
        {
          title: "Moo News",
          key: "MooNews",
          items: [
            { label: "Add Moo News", path: "/mooNews/add" },
            { label: "List Moo News", path: "/mooNews" },
          ],
        },
      ]
    : []),
  {
    title: "Audit",
    key: "Audit",
    items: [
      { label: "Audit Behavior Based Safety", path: "/auditBehaviours" },
      { label: "Add Behavior Based Safety", path: "/auditBehaviours/add2" },
      { label: "Audit GMP", path: "/gmp" },
      { label: "Add GMP", path: "/gmp/addGMP" },
      { label: "History Coaching", path: "/coach" },
      { label: "Add Coaching", path: "/coach/add" },
      // { label: "PSG Initiaton", path: "/psg" },
    ],
  },
  ...(user?.role?.id === 11 || user?.role?.id === 9
    ? [
        {
          label: "CILT Approval",
          path: "/cilt", // atau onClick jika perlu
        },
      ]
    : []),
  {
    title: "Training",
    key: "Training",
    items: [{ label: "Training", onClick: handleHRGARedirect }],
  },
];

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  // expand/collapse state per-kategori
  const [openSections, setOpenSections] = useState({
    Greentag: true,
    RoomReservation: false,
    Audit: false,
    MooNews: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDrawerToggle = () => setMobileOpen((s) => !s);
  const handleDrawerClose = () => setMobileOpen(false);

  const handleHRGARedirect = () => {
    if (!user) {
      alert("User belum login!");
      return;
    }
    let identityData = null;
    try {
      const cookieData = getCookie("identityData");
      if (cookieData) identityData = JSON.parse(cookieData).data || null;
    } catch {
      identityData = null;
    }
    const payload = JSON.stringify({
      token: getCookie("token"),
      username: user.username,
      email: user.email,
      role: user.role?.id || "",
      ...identityData,
    });
    const secretKey = "?asdasdASE@fdglhkdfhJJLakasd$%"; // TODO: pindahkan ke env
    const encrypted = CryptoJS.AES.encrypt(payload, secretKey).toString();
    const targetUrl = `${API_TRAINING}/?id=${encodeURIComponent(encrypted)}`;
    window.location.href = targetUrl;
  };

  const navItemsDesktop = [
    { label: "greenTAG", path: "/greentag" },
    { label: "Room Reservation", path: "/reservation" },
    { label: "Add Behavior", path: "/auditBehaviours/add2" },
    { label: "Add GMP", path: "/gmp/addGMP" },
    { label: "Coaching", path: "/coach/add" },
    { label: "HRGA", onClick: handleHRGARedirect },
  ];

  // Hitung sekali agar tidak memanggil groupedNav berkali-kali
  // ganti useMemo saat ini
  const groups = useMemo(
    () => (user ? groupedNav(user, handleHRGARedirect) : []),
    [user, handleHRGARedirect]
  );

  // ====== Drawer with grouped collapsible menus ======
  const drawer = (
    <List
      subheader={
        <ListSubheader component="div" sx={{ bgcolor: "transparent" }}>
          Menu
        </ListSubheader>
      }
    >
      {user &&
        groups.map((group, gi) =>
          group.items ? (
            <React.Fragment key={group.key}>
              <ListItem disablePadding>
                <ListItemButton onClick={() => toggleSection(group.key)}>
                  <ListItemText
                    primary={group.title}
                    primaryTypographyProps={{ fontWeight: 700 }}
                  />
                  {openSections[group.key] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              <Collapse
                in={openSections[group.key]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {group.items.map((item) => (
                    <ListItem key={item.label} disablePadding sx={{ pl: 2 }}>
                      {item.onClick ? (
                        <ListItemButton onClick={item.onClick}>
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      ) : (
                        <Link
                          href={item.path}
                          style={{ width: "100%", textDecoration: "none" }}
                        >
                          <ListItemButton>
                            <ListItemText primary={item.label} />
                          </ListItemButton>
                        </Link>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Collapse>

              {gi < groups.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ) : (
            <ListItem key={group.label} disablePadding>
              <Link
                href={group.path}
                style={{ width: "100%", textDecoration: "none" }}
              >
                <ListItemButton>
                  <ListItemText primary={group.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          )
        )}

      {!user && (
        <>
          <Divider sx={{ my: 1 }} />
          <ListItem disablePadding>
            <Link
              href="/account/login"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <ListItemButton>
                <FaSignInAlt />
                <span style={{ marginLeft: 8 }}>Login</span>
              </ListItemButton>
            </Link>
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundImage: `url(./images/header_bg.png)`,
        }}
      >
        {/* Left: burger */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo ke situs eksternal → gunakan <a> */}
        <a href="http://great.greenfieldsdairy.com/">
          <Image src="/images/gfi.png" width={50} height={50} alt="logo" />
        </a>

        {/* Brand text ke eksternal */}
        <a
          href="http://great.greenfieldsdairy.com/"
          className={styles.desktopMenu}
          style={{ color: "green" }}
        >
          <b style={{ fontSize: 30, color: "green" }}>.R.E.A.T</b>
        </a>

        {/* Desktop top menu */}
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
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          sx: { color: HEADER_TEXT_COLOR },
                        }}
                      />
                    </ListItemButton>
                  ) : (
                    <Link href={item.path} style={{ textDecoration: "none" }}>
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            sx: { color: HEADER_TEXT_COLOR },
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  )}
                </ListItem>
              ))}
            {!user && (
              <ListItem disablePadding>
                <Link href="/account/login" style={{ textDecoration: "none" }}>
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

        {/* Right: logout */}
        {user && (
          <button onClick={() => logout()} className="btn-secondary btn-icon">
            <FaSignOutAlt /> {user.email.split("@")[0]}
          </button>
        )}
      </Toolbar>

      {/* Drawer (sidebar) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 260,
            "& .MuiListItemButton-root": { borderRadius: 1 },
            "& .MuiListItemButton-root.Mui-selected": {
              bgcolor: "action.selected",
            },
          },
        }}
      >
        {drawer}

        {/* Footer kecil di drawer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(./images/header_bg.png)`,
            padding: 12,
          }}
        >
          <Link href="/">
            <Image
              alt="greendazh"
              src="/images/gfi.png"
              width={40}
              height={40}
            />
          </Link>
          <a
            target="_blank"
            href="http://great.greenfieldsdairy.com/"
            style={{ color: "#32CD32", textDecoration: "none" }}
            rel="noopener noreferrer"
          >
            &nbsp;&nbsp;
            <b style={{ fontSize: 30, color: "#32CD32" }}>G.R.E.A.T</b>
          </a>
        </div>
      </Drawer>
    </AppBar>
  );
}
