"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
interface DeleteVitalsProps {
  patientID: string;
  vitalsID: string;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const deleteVitals = async ({
  patientID,
  vitalsID,
}: {
  patientID: string;
  vitalsID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/vitals/${vitalsID}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const { deletedVitals } = await response.json();
  return deletedVitals;
};

const DeleteVitals = ({ vitalsID, patientID }: DeleteVitalsProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const results = await deleteVitals({ patientID, vitalsID });
    console.log(results);
    router.replace("/");
  };
  return (
    <IconButton edge="end" onClick={handleDelete}>
      <Delete /> Delete
    </IconButton>
  );
};

export default DeleteVitals;
