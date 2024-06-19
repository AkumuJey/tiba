import AppointmentsDash from "@/components/Appointments";
import DashboardProfile from "@/components/DashboardProfile";
import PatientsDash from "@/components/PatientsDash";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { Container } from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
}

interface AppointmentDetails {
  id: number;
  createdAt: string;
  patientID: number;
  healthProviderID: number;
  venue: string;
  appointmentTime: string;
  amount: number;
  description: string;
  patient: {
    firstName: string;
    lastName: string;
  };
}

const fetchPatients = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/provider/patients/?limit=5",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data.patients;
    } else {
      console.log("Failed to fetch patients");
      return [];
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

const fetchAppointments = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/provider/appointments/?limit=5",
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data.appointments;
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
  const [patients, appointments] = await Promise.all([
    fetchPatients(),
    fetchAppointments(),
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
