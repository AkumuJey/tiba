"use client";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
    console.log(response);
    if (response.status === 204) {
      return response.data.deletedPrescription;
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    const results = await deletePrescription({ patientID, prescriptionID });
    setLoading(false);
    if (results) {
      router.replace(`/patients/${patientID}/prescriptions/`);
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

export default DeletePrescriptionPage;
