import {
  CancelOutlined,
  CheckCircleOutline,
  Email,
  Person,
  VerifiedUser,
} from "@mui/icons-material/";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  title: string;
  verified: boolean;
}

const DashboardProfile = async () => {
  const profile: Profile = await fetchProfile();
  return (
    <>
      {profile && (
        // <Container component="main" maxWidth="lg" sx={{ mt: 4 }} >
        <Grid item xs={12} md={6}>
          {/* Profile Summary */}
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Avatar sx={{ width: 100, height: 100, mr: 4 }}>
                <Person />
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  {profile.firstName + " " + profile.lastName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  <Email sx={{ mr: 1 }} />
                  {profile.email}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  <VerifiedUser sx={{ mr: 1 }} />
                  {profile.verified ? "Verified" : "Not Verified"}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default DashboardProfile;
