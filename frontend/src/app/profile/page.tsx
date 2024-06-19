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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";
const fetchProfile = async () => {
  const response = await fetch("http://localhost:4000/provider/profile/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearers ${token}`,
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.profile;
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
  const profile: Profile = await fetchProfile();
  const {
    age,
    createdAt,
    email,
    firstName,
    lastName,
    phoneNo,
    subscribed,
    title,
    verified,
  } = profile;
  console.log(profile);
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
                {title} {firstName} {lastName}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Joined on {new Date(createdAt).toLocaleDateString()}
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
                secondary={email}
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
                secondary={phoneNo}
                primaryTypographyProps={{ variant: "subtitle1" }}
              />
              <IconButton edge="end">
                <Edit />
              </IconButton>
            </ListItem>
            {age && (
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "success.main" }}>
                    <VerifiedUser />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Age"
                  secondary={age}
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
                secondary={verified ? "Yes" : "No"}
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
                secondary={subscribed ? "Yes" : "No"}
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
