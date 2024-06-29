"use server";

import AppointmentsDisplay from "@/components/Appointments";
import DashboardProfile from "@/components/DashboardProfile";
import PatientsList from "@/components/PatientsList";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { Container, Paper } from "@mui/material";

const Dashboard = async () => {
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <div className="md:w-3/4 mx-auto">
        <DashboardProfile />
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 mx-auto gap-[1rem]">
        <PatientsList limit={5} />
        <Paper
          className="w-full md:w-1/2 bg-[#F1F6F6]"
          elevation={3}
          sx={{ p: 3 }}
        >
          <AppointmentsDisplay limit={5} />
        </Paper>
      </div>
    </Container>
  );
};

const ProtectedDashboard = () => (
  <ProtectedRoutes>
    <Dashboard />
  </ProtectedRoutes>
);
export default ProtectedDashboard;
