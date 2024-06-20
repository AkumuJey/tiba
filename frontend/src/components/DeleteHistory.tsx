"use client";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      console.log("Failed to delete medical history");
      return null;
    }
  } catch (error) {
    console.error("Error deleting medical history:", error);
    return null;
  }
};

const DeleteMedicalHistoryPage = ({
  medicalHistoryID,
  patientID,
}: DeleteHistoryProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const results = await deleteHistory({ patientID, medicalHistoryID });
    setLoading(false);
    if (results) {
      router.replace(`/patients/${patientID}/medical-histories/`);
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

export default DeleteMedicalHistoryPage;
