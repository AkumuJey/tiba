import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        backgroundColor: "transparent",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} Tiba Healthcare
        </Typography>
        <Box>
          <IconButton
            component={MuiLink}
            href="https://www.facebook.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ mx: 1 }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component={MuiLink}
            href="https://www.twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            sx={{ mx: 1 }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={MuiLink}
            href="mailto:your-email@example.com"
            color="inherit"
            sx={{ mx: 1 }}
          >
            <EmailIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
