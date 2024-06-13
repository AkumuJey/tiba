import AppointmentsDash from "@/components/Appointments";
import DashboardProfile from "@/components/DashboardProfile";
import PatientsDash from "@/components/PatientsDash";
import { Container } from "@mui/material";

const Dashboard = async () => {
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <div className="md:w-3/4 mx-auto">
        <DashboardProfile />
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 mx-auto gap-[1rem]">
        <PatientsDash />
        <AppointmentsDash />
      </div>
    </Container>
  );
};

export default Dashboard;
