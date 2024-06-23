import DeleteAppointment from "@/components/DeleteAppointment.tsx";
import { Edit } from "@mui/icons-material";
import { IconButton, Paper, Typography } from "@mui/material";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import ControllerAppointmentForm from "./ControllerAppointmentForm";

interface AppointmentDetails {
  venue: string;
  appointmentTime: string;
  amount: number;
  description?: string;
}

const fetchAppointment = async ({
  cookieHeader,
  patientID,
  appointmentID,
}: {
  cookieHeader: string;
  patientID: string;
  appointmentID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === (200 || 201)) {
      return response.data.appointment;
    } else {
      console.log("Failed to fetch appointment");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return [];
  }
};

const EditAppointmentPage = async ({
  params,
}: {
  params: { appointmentID: string; patientID: string };
}) => {
  const { patientID, appointmentID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const appointment: AppointmentDetails = await fetchAppointment({
    appointmentID,
    patientID,
    cookieHeader,
  });

  return (
    <>
      <ControllerAppointmentForm appointment={appointment} params={params} />
    </>
  );
};

export default EditAppointmentPage;
