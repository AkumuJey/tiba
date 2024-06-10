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
    <Paper
      className="flex flex-col gap-3 w-full md:w-2/3 mx-[1rem] md:mx-auto bg-[#D8D9E0] p-[1rem]"
      elevation={1}
    >
      {profile && (
        <>
          <div className="flex">
            <div className="w-1/2 flex gap-3">
              <h5>
                <strong>ID: </strong>
                {profile.id}
              </h5>
              <h5>
                <strong>Name: </strong>
                {profile.title +
                  " " +
                  profile.firstName +
                  " " +
                  profile.lastName}
              </h5>
            </div>
            <div className="w-1/2 flex justify-end">
              <Chip
                label={profile.verified ? "Verified" : "Unverified"}
                color={profile.verified ? "success" : "default"}
                icon={
                  profile.verified ? <CheckCircleOutline /> : <CancelOutlined />
                }
              />
            </div>
          </div>
          <div className="flex justify-between">
            <h5>
              <strong>Email: </strong>
              {profile.email}
            </h5>
            <h5>
              <strong>Phone no: </strong>
              {profile.phoneNo}
            </h5>
          </div>
        </>
      )}
    </Paper>
  );
};

export default DashboardProfile;
