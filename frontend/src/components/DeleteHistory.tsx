"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
interface DeleteHistoryProps {
  patientID: string;
  medicalHistoryID: string;
}

const deleteHistory = async ({
  patientID,
  medicalHistoryID,
}: {
  patientID: string;
  medicalHistoryID: string;
}) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/provider/${patientID}/histories/${medicalHistoryID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically sends cookies
      }
    );
    if (response.status === 204) {
      return response.data.deletedMedicalHistory;
    } else {
      console.log("Failed to fetch appointment");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return [];
  }
};

const DeleteMedicalHistoryPage = ({
  medicalHistoryID,
  patientID,
}: DeleteHistoryProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const results = await deleteHistory({ patientID, medicalHistoryID });
    if (results) {
      router.replace(`/patients/${patientID}/medical-histories/`);
    }
  };
  return (
    <IconButton edge="end" onClick={handleDelete}>
      <Delete /> Delete
    </IconButton>
  );
};

export default DeleteMedicalHistoryPage;
