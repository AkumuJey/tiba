"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteAppointmentProps {
  patientID: string;
  appointmentID: string;
}

const deleteAppointment = async ({
  patientID,
  appointmentID,
}: {
  patientID: string;
  appointmentID: string;
}) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/provider/${patientID}/appointments/${appointmentID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically sends cookies
      }
    );
    if (response.status === 204) {
      return response.data.deletedAppointment;
    } else {
      console.log("Failed to fetch appointment");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return [];
  }
};

const DeleteAppointmentPage = ({
  appointmentID,
  patientID,
}: DeleteAppointmentProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const results = await deleteAppointment({ appointmentID, patientID });
    if (results) {
      router.replace(`/patients/${patientID}/appointments/`);
    }
  };
  return (
    <IconButton edge="end" onClick={handleDelete}>
      <Delete /> Delete
    </IconButton>
  );
};

export default DeleteAppointmentPage;
