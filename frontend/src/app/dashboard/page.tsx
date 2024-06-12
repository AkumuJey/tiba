import AppointmentsDash from "@/components/Appointments";
import DashboardProfile from "@/components/DashboardProfile";
import PatientsDash from "@/components/PatientsDash";
import { Container } from "@mui/material";

const Dashboard = async () => {
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <DashboardProfile />
      {/* <div> */}
      <PatientsDash />
      <AppointmentsDash />
      {/* </div> */}
    </Container>
  );
};

export default Dashboard;
