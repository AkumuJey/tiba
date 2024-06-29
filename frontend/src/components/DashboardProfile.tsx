import { fetchProfile } from "@/lib/dashboartUtils";
import { getCookies } from "@/lib/getCookies";
import { Email, Person, VerifiedUser } from "@mui/icons-material/";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import Link from "next/link";

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
  const cookieHeader = getCookies();
  const profile: Profile = await fetchProfile(cookieHeader);
  return (
    <>
      {profile && (
        // <Container component="main" maxWidth="lg" sx={{ mt: 4 }} >
        <Grid item xs={12} md={6}>
          {/* Profile Summary */}
          <Paper elevation={3} sx={{ p: 4, mb: 4 }} className="bg-[#DDE2EE]">
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Avatar sx={{ width: 80, height: 80, mr: 4 }}>
                <Person />
              </Avatar>
              <Box>
                <Typography variant="h6" gutterBottom>
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
              <Link href={`/profile`}>Profile page</Link>
            </Box>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default DashboardProfile;
