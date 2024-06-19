import ProtectedRoutes from "@/components/ProtectedRoutes";
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
import axios from "axios";
import { cookies } from "next/headers";

const fetchProfile = async (cookieHeader: string) => {
  try {
    const response = await axios.get("http://localhost:4000/provider/profile", {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // Pass cookies from the request
      },
      withCredentials: true, // Automatically sends cookies
    });
    if (response.status === 200) {
      return response.data.profile;
    } else {
      console.log("Failed to fetch profile");
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

interface Profile {
  createdAt: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phoneNo: string;
  age: number | null;
  verified: boolean;
  subscribed: boolean;
}
const Profile = async () => {
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";

  const profile: Profile = await fetchProfile(cookieHeader);

  return (
    <ProtectedRoutes>
      <Container
        component="main"
        maxWidth="md"
        sx={{ mt: 4 }}
        className="w-[95%] mx-auto flex justify-center items-center min-h-screen"
      >
        <Paper elevation={3} sx={{ p: 4 }} className="w-full">
          <Box
            sx={{ display: "flex", alignItems: "center", mb: 4 }}
            className=""
          >
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
              <IconButton edge="end">
                <Edit />
              </IconButton>
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
                <IconButton edge="end">
                  <Edit />
                </IconButton>
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
              <IconButton edge="end">
                <Edit />
              </IconButton>
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
              <IconButton edge="end">
                <Edit />
              </IconButton>
            </ListItem>
          </List>
        </Paper>
      </Container>
    </ProtectedRoutes>
  );
};

export default Profile;
