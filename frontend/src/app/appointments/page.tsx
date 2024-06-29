"use server";
import AppointmentsDisplay from "@/components/Appointments";
import { Delete, Edit } from "@mui/icons-material";
import {
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";

interface PatientDetails {
  firstName: string;
  lastName: string;
}

interface AppointmentDetails {
  id: number;
  createdAt: string; // ISO 8601 date string
  patientID: number;
  healthProviderID: number;
  venue: string;
  appointmentTime: string; // ISO 8601 date string
  amount: number;
  description: string;
  patient: PatientDetails;
}

const fetchAppointments = async (cookieHeader: string) => {
  try {
    const response = await axios.get(
      "http://localhost:4000/provider/appointments/",
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

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { formattedDate, formattedTime };
};

const Appointments = async () => {
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const appointments: AppointmentDetails[] = await fetchAppointments(
    cookieHeader
  );
  return (
    <Grid className="w-[95%] md:w-3/4 mx-auto">
      <Paper
        elevation={2}
        className="w-[95%] md:w-3/4 mx-auto mt-[1rem] bg-transparent p-4"
      >
        <AppointmentsDisplay />
      </Paper>
    </Grid>
  );
};

export default Appointments;
