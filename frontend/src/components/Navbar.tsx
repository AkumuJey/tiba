"use client";
import { useAuth } from "@/utils/AuthContextProvider";
import { LocalHospital, Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  SyntheticEvent,
  useState,
} from "react";

interface HideOnScrollProps {
  children: ReactNode;
}

const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children as any}
    </Slide>
  );
};

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const signout = async (e: SyntheticEvent) => {
    e.preventDefault();
    await handleLogout();
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} href="/" selected={pathname === "/"}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          component={Link}
          href="/dashboard"
          selected={pathname === "/dashboard"}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          component={Link}
          href="/appointments"
          selected={pathname === "/appointments"}
        >
          <ListItemText primary="Appointments" />
        </ListItem>
        <ListItem
          component={Link}
          href="/patients"
          selected={pathname === "/patients"}
        >
          <ListItemText primary="Patients" />
        </ListItem>
        {isLoggedIn ? (
          <ListItem button onClick={signout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem
              component={Link}
              href="/signup"
              selected={pathname === "/signup"}
            >
              <ListItemText primary="Signup" />
            </ListItem>
            <ListItem
              component={Link}
              href="/login"
              selected={pathname === "/login"}
            >
              <ListItemText primary="Login" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <HideOnScroll>
      <AppBar position="fixed" sx={{ backgroundColor: "#E0D9E6" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LocalHospital sx={{ mr: 2 }} />
            <Typography variant="h6">
              <Link href="/" passHref>
                <Button sx={{ color: "black" }}>Tiba</Button>
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Link href="/" passHref>
              <Button sx={{ color: pathname === "/" ? "purple" : "black" }}>
                Home
              </Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button
                sx={{ color: pathname === "/dashboard" ? "purple" : "black" }}
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/appointments" passHref>
              <Button
                sx={{
                  color: pathname === "/appointments" ? "purple" : "black",
                }}
              >
                Appointments
              </Button>
            </Link>
            <Link href="/patients" passHref>
              <Button
                sx={{ color: pathname === "/patients" ? "purple" : "black" }}
              >
                Patients
              </Button>
            </Link>
            {isLoggedIn ? (
              <Button onClick={signout} sx={{ color: "black" }}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/signup" passHref>
                  <Button
                    sx={{ color: pathname === "/signup" ? "purple" : "black" }}
                  >
                    Signup
                  </Button>
                </Link>
                <Link href="/login" passHref>
                  <Button
                    sx={{ color: pathname === "/login" ? "purple" : "black" }}
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: { width: "66%", bgcolor: "#C6C7CE", color: "black" },
              }}
            >
              {drawerList()}
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
