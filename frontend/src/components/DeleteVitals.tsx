"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
interface DeleteVitalsProps {
  patientID: string;
  vitalsID: string;
}

const deleteVitals = async ({
  patientID,
  vitalsID,
}: {
  patientID: string;
  vitalsID: string;
}) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/provider/${patientID}/vitals/${vitalsID}`,
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

const DeleteVitals = ({ vitalsID, patientID }: DeleteVitalsProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const results = await deleteVitals({ patientID, vitalsID });
    if (results) {
      router.replace(`/patients/${patientID}/vitals/`);
    }
  };
  return (
    <IconButton edge="end" onClick={handleDelete}>
      <Delete /> Delete
    </IconButton>
  );
};

export default DeleteVitals;
