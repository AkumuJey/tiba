"use client";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      console.log("Failed to delete appointment");
      return null;
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return null;
  }
};

const DeleteAppointmentPage = ({
  appointmentID,
  patientID,
}: DeleteAppointmentProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deleteAppointment({ appointmentID, patientID });
    setLoading(false);
    if (result) {
      router.replace(`/patients/${patientID}/appointments/`);
    }
  };

  return (
    <LoadingButton
      onClick={handleDelete}
      loading={loading}
      variant="contained"
      color="secondary"
      startIcon={<Delete />}
    >
      Delete
    </LoadingButton>
  );
};

export default DeleteAppointmentPage;
