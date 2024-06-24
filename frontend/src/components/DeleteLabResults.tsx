"use client";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteLabsProps {
  patientID: string;
  labsID: string;
}

const deleteLabResults = async ({
  patientID,
  labsID,
}: {
  patientID: string;
  labsID: string;
}) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/provider/${patientID}/labs/${labsID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === 200 || response.status === 204) {
      console.log("Successfully deleted lab results.");
      return response.data;
    } else {
      console.log("Failed to delete lab results.");
      return null;
    }
  } catch (error) {
    console.error("Error deleting lab results:", error);
    return null;
  }
};

const DeleteLabResultsPage = ({ labsID, patientID }: DeleteLabsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const results = await deleteLabResults({ labsID, patientID });
    setLoading(false);
    if (results !== null) {
      console.log("Navigating to labs page.");
      router.push(`/patients/${patientID}/labs`);
    } else {
      console.error("Failed to navigate. Results are null.");
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

export default DeleteLabResultsPage;
