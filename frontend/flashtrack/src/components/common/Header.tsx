"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  IconButton,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
} from "@mui/material";
import {
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import { useTheme } from "@/context/theme-context";
import CustomButton from "./CustomButton";

export default function Header() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setDrawerOpen(false); // close drawer on mobile
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Demo", id: "demo" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: theme === "dark" ? "rgba(18, 18, 18, 0.75)" : "#EFDCAB",
          backdropFilter: "blur(16px)",
          zIndex: 1300,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            onClick={() => scrollTo("home")}
            sx={{
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: theme === "dark" ? "#FFFFFF" : "#000000",
              fontFamily: "'Poppins', sans-serif",
              cursor: "pointer",
            }}
          >
            ⚡ FlashTrack
          </Typography>

          {isMobile ? (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={() => setDrawerOpen(true)} color="inherit">
                <MenuIcon />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" spacing={3} alignItems="center">
              {navItems.map((item) => (
                <CustomButton
                  key={item.label}
                  text={item.label}
                  onClick={() => scrollTo(item.id)}
                />
              ))}
              <CustomButton
                onClick={() => router.push("/ownCards")}
                text="Own Cards ➤"
                isTryButton
              />
              <IconButton onClick={toggleTheme} color="inherit">
                {theme === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Stack>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <List>
            {navItems.map((item) => (
              <ListItemButton onClick={() => scrollTo(item.id)} key="home">
                <ListItemText primary="Home" />
              </ListItemButton>
            ))}
            <ListItemButton
              onClick={() => {
                router.push("/ownCards");
                setDrawerOpen(false);
              }}
            >
              <ListItemText primary="Own Cards ➤" />
            </ListItemButton>
            <ListItem>
              <IconButton onClick={toggleTheme} color="inherit">
                {theme === "dark" ? <LightMode /> : <DarkMode />}
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
