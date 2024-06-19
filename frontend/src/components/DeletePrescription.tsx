"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
interface DeletePrescriptionProps {
  patientID: string;
  prescriptionID: string;
}

const deletePrescription = async ({
  patientID,
  prescriptionID,
}: {
  patientID: string;
  prescriptionID: string;
}) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/provider/${patientID}/prescription/${prescriptionID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically sends cookies
      }
    );
    if (response.status === 204) {
      return response.data.deletedVitals;
    } else {
      console.log("Failed to fetch appointment");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return [];
  }
};

const DeletePrescriptionPage = ({
  prescriptionID,
  patientID,
}: DeletePrescriptionProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const results = await deletePrescription({ patientID, prescriptionID });
    if (results) {
      router.replace(`/patients/${patientID}/prescriptions/`);
    }
  };
  return (
    <IconButton edge="end" onClick={handleDelete}>
      <Delete /> Delete
    </IconButton>
  );
};

export default DeletePrescriptionPage;
