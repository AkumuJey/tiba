"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
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
    if (response.status === 204) {
      return response.data.deletedHospitalLabs;
    } else {
      console.log("Failed to fetch appointment");
      return [];
    }
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return [];
  }
};
const DeleteLabResultsPage = ({ labsID, patientID }: DeleteLabsProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const results = await deleteLabResults({ labsID, patientID });
    if (results) {
      router.replace(`/patients/${patientID}/labs/`);
    }
  };
  return (
    <IconButton edge="end" onClick={handleDelete}>
      <Delete /> Delete
    </IconButton>
  );
};

export default DeleteLabResultsPage;
