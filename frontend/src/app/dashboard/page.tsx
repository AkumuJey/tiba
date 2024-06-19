// app/dashboard/page.js
import AppointmentsDash from "@/components/Appointments";
import DashboardProfile from "@/components/DashboardProfile";
import PatientsDash from "@/components/PatientsDash";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { Container } from "@mui/material";
import { cookies } from "next/headers";

const fetchPatients = async (cookieHeader: string) => {
  try {
    const response = await fetch(
      "http://localhost:4000/provider/patients/?limit=5",
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.patients;
    } else {
      console.log("Failed to fetch patients");
      return [];
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

const fetchAppointments = async (cookieHeader: string) => {
  try {
    const response = await fetch(
      "http://localhost:4000/provider/appointments/?limit=5",
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.appointments;
    } else {
      console.log("Failed to fetch appointments");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};

const Dashboard = async () => {
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";

  const [patients, appointments] = await Promise.all([
    fetchPatients(cookieHeader),
    fetchAppointments(cookieHeader),
  ]);

  return (
    <ProtectedRoutes>
      <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
        <div className="md:w-3/4 mx-auto">
          <DashboardProfile />
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 mx-auto gap-[1rem]">
          <PatientsDash patients={patients} />
          <AppointmentsDash appointments={appointments} />
        </div>
      </Container>
    </ProtectedRoutes>
  );
};

export default Dashboard;
