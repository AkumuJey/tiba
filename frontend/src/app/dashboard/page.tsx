import AppointmentsDash from "@/components/Appointments";
import DashboardProfile from "@/components/DashboardProfile";
import PatientsDash from "@/components/PatientsDash";

const Dashboard = async () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <DashboardProfile />
        <div>
          <PatientsDash />
          <AppointmentsDash />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
