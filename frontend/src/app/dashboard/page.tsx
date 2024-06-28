"use server";

import AppointmentsDisplay from "@/components/Appointments";
import DashboardProfile from "@/components/DashboardProfile";
import PatientsDash from "@/components/PatientsDash";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { Container, Paper, Skeleton } from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import { Suspense } from "react";

const fetchPatients = async (cookieHeader: string) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/provider/patients/?limit=5",
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
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

const fetchAppointments = async (cookieHeader: string) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/provider/appointments/?limit=5",
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
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

const fetchProfile = async (cookieHeader: string) => {
  try {
    const response = await axios.get("http://localhost:4000/provider/profile", {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // Pass cookies from the request
      },
      withCredentials: true, // Automatically sends cookies
    });
    if (response.status === 200) {
      return response.data.profile;
    } else {
      console.log("Failed to fetch profile");
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

const Dashboard = async () => {
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";

  const [patients, appointments, profile] = await Promise.all([
    fetchPatients(cookieHeader),
    fetchAppointments(cookieHeader),
    fetchProfile(cookieHeader),
  ]);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <div className="md:w-3/4 mx-auto">
        <DashboardProfile profile={profile} />
      </div>
      <div className="flex flex-col md:flex-row justify-between w-full md:w-3/4 mx-auto gap-[1rem]">
        <Suspense
          fallback={
            <Skeleton height={200} variant="rectangular" animation="wave" />
          }
        >
          <PatientsDash patients={patients} />
          <Paper
            className="w-full md:w-1/2 bg-[#F1F6F6]"
            elevation={3}
            sx={{ p: 3 }}
          >
            <AppointmentsDisplay appointments={appointments} />
          </Paper>
        </Suspense>
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
