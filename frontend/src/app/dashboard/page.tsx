import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material/";
import { Chip, Paper } from "@mui/material";

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
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  verified: boolean;
}
const Dashboard = async () => {
  const profile: Profile = await fetchProfile();
  console.log(profile);
  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <h3>Profile</h3>
        <div>
          <Paper elevation={1}></Paper>
          <Paper elevation={1}></Paper>
          <Paper elevation={1}></Paper>
          <Paper elevation={1}></Paper>
        </div>
        <div className="flex flex-col">
          {profile && (
            <>
              <h5>
                Name:
                {profile.title +
                  " " +
                  profile.firstName +
                  " " +
                  profile.lastName}
              </h5>
              <div className="flex justify-between">
                <h5>Email: {profile.email}</h5>
                <Chip
                  label={profile.verified ? "Verified" : "Unverified"}
                  color={profile.verified ? "success" : "default"}
                  icon={
                    profile.verified ? (
                      <CheckCircleOutline />
                    ) : (
                      <CancelOutlined />
                    )
                  }
                />
                <Chip
                  label={profile.verified ? "Unverified" : "Verified"}
                  color={profile.verified ? "default" : "success"}
                  icon={
                    profile.verified ? (
                      <CancelOutlined />
                    ) : (
                      <CheckCircleOutline />
                    )
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
