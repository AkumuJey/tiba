"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
interface DeleteLabsProps {
  patientID: string;
  labsID: string;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const deleteLabResults = async ({
  patientID,
  labsID,
}: {
  patientID: string;
  labsID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/labs/${labsID}`,
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
  const { deletedHospitalLabs } = await response.json();
  return deletedHospitalLabs;
};
const DeleteLabResults = ({ labsID, patientID }: DeleteLabsProps) => {
  const router = useRouter();
  const handleDelete = () => {
    const results = deleteLabResults({ labsID, patientID });
    router.replace("/");
  };
  return (
    <IconButton edge="end" onClick={handleDelete}>
      <Delete /> Delete
    </IconButton>
  );
};

export default DeleteLabResults;
