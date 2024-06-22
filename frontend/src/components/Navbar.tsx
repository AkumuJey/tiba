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
          className={`font-medium text-lg ${
            pathname === "/" ? "text-purple-800" : "text-black"
          }`}
          component={Link}
          href="/"
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          className={`font-medium text-lg ${
            pathname === "/dashboard" ? "text-purple-800" : "text-black"
          }`}
          component={Link}
          href="/dashboard"
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          className={`font-medium text-lg ${
            pathname === "/appointments" ? "text-purple-800" : "text-black"
          }`}
          component={Link}
          href="/appointments"
        >
          <ListItemText primary="Appointment" />
        </ListItem>
        {isLoggedIn ? (
          <ListItem
            onClick={signout}
            className={`font-medium text-lg text-black`}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <>
            <ListItem
              className={`font-medium text-lg ${
                pathname === "/signup" ? "text-purple-800" : "text-black"
              }`}
              component={Link}
              href="/signup"
            >
              <ListItemText primary="Signup" />
            </ListItem>
            <ListItem
              className={`font-medium text-lg ${
                pathname === "/login" ? "text-purple-800" : "text-black"
              }`}
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
                <Button className="text-black font-medium text-lg">Tiba</Button>
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex", gap: "1rem" } }}>
            <Link
              href="/"
              className={`font-medium text-lg ${
                pathname === "/" ? "text-purple-800" : "text-black"
              }`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`font-medium text-lg ${
                pathname === "/dashboard" ? "text-purple-800" : "text-black"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/appointments"
              className={`font-medium text-lg ${
                pathname === "/appointments" ? "text-purple-800" : "text-black"
              }`}
            >
              Appointment
            </Link>
            {isLoggedIn ? (
              <Link
                href={`/logout`}
                className={`font-medium text-lg text-black`}
                onClick={signout}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className={`font-medium text-lg ${
                    pathname === "/signup" ? "text-purple-800" : "text-black"
                  }`}
                >
                  Signup
                </Link>
                <Link
                  href="/login"
                  className={`font-medium text-lg ${
                    pathname === "/login" ? "text-purple-800" : "text-black"
                  }`}
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
