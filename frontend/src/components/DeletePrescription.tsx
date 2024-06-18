"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
interface DeletePrescriptionProps {
  patientID: string;
  prescriptionID: string;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const deletePrescription = async ({
  patientID,
  prescriptionID,
}: {
  patientID: string;
  prescriptionID: string;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/prescription/${prescriptionID}`,
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
  const { deletedPrrescription } = await response.json();
  return deletedPrrescription;
};

const DeletePrescription = ({
  prescriptionID,
  patientID,
}: DeletePrescriptionProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    const results = await deletePrescription({ patientID, prescriptionID });
    console.log(results);
    router.replace("/");
  };
  return (
    <IconButton edge="end" onClick={handleDelete}>
      <Delete /> Delete
    </IconButton>
  );
};

export default DeletePrescription;
