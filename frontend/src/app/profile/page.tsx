import ProtectedRoutes from "@/components/ProtectedRoutes";
import { fetchProfile, Profile } from "@/lib/dashboartUtils";
import { getCookies } from "@/lib/getCookies";
import { Edit, Email, Person, Phone, VerifiedUser } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

// Server Component to render the ProfilePage
const ProfilePage = async () => {
  const cookieHeader = getCookies();

  const profile: Profile = await fetchProfile(cookieHeader);
  console.log(profile);

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ mt: 4 }}
      className={`w-[95%] mx-auto flex justify-center items-${
        profile ? "center" : "start"
      } min-h-screen`}
    >
      <Paper elevation={3} sx={{ p: 4 }} className="w-full bg-transparent">
        {!profile ? (
          <>
            <div>Failed to load profile.</div>
          </>
        ) : (
          <>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Avatar sx={{ width: 100, height: 100, mr: 4 }}>
                <Person />
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {profile.title} {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Joined on {new Date(profile.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 4 }} />
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    <Email />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Email"
                  secondary={profile.email}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                />
                <IconButton edge="end">
                  <Edit />
                </IconButton>
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <Phone />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Phone Number"
                  secondary={profile.phoneNo}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                />
              </ListItem>
              {profile.age && (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "success.main" }}>
                      <VerifiedUser />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Age"
                    secondary={profile.age}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                  />
                </ListItem>
              )}
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "warning.main" }}>
                    <VerifiedUser />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Verified"
                  secondary={profile.verified ? "Yes" : "No"}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "info.main" }}>
                    <VerifiedUser />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Subscribed"
                  secondary={profile.subscribed ? "Yes" : "No"}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                />
              </ListItem>
            </List>
          </>
        )}
      </Paper>
    </Container>
  );
};

const ProtectedProfile = () => (
  <ProtectedRoutes>
    <ProfilePage />
  </ProtectedRoutes>
);

export default ProtectedProfile;
