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
      sx={{ width: "auto" }}
      role="presentation"
      onClick={(event) => {
        if ((event.target as HTMLElement).tagName !== "A") {
          toggleDrawer(false)(event);
        }
      }}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem
          className={pathname === "/" ? "text-purple-800" : ""}
          component={Link}
          href="/"
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          className={pathname === "/dashboard" ? "text-purple-800" : ""}
          component={Link}
          href="/dashboard"
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          className={pathname === "/appointments" ? "text-purple-800" : ""}
          component={Link}
          href="/appointments"
        >
          <ListItemText primary="Appointment" />
        </ListItem>
        {isLoggedIn ? (
          <ListItem onClick={signout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem
              className={pathname === "/signup" ? "text-purple-800" : ""}
              component={Link}
              href="/signup"
            >
              <ListItemText primary="Signup" />
            </ListItem>
            <ListItem
              className={pathname === "/login" ? "text-purple-800" : ""}
              component={Link}
              href="/login"
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
        <Toolbar>
          <Box display="flex" alignItems="center" flexGrow={1}>
            <LocalHospital sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">
                <Button color="inherit">Tiba</Button>
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              href="/"
              className={pathname === "/" ? "text-purple-800" : ""}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={pathname === "/dashboard" ? "text-purple-800" : ""}
            >
              Dashboard
            </Link>
            <Link
              href="/appointments"
              className={pathname === "/appointments" ? "text-purple-800" : ""}
            >
              Appointment
            </Link>
            {isLoggedIn ? (
              <Link href={`/logout`} color="inherit" onClick={signout}>
                Logout
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className={pathname === "/signup" ? "text-purple-800" : ""}
                >
                  Signup
                </Link>
                <Link
                  href="/login"
                  className={pathname === "/login" ? "text-purple-800" : ""}
                >
                  Login
                </Link>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
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
