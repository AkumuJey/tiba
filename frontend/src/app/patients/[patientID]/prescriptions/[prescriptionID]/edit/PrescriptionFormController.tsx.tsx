"use client";
import PrescriptionForm from "@/components/PrescriptionForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

export interface Prescription {
  date: string;
  instruction?: string;
  drugs: Drug[];
}

interface EditPrescriptionsProps {
  params: { prescriptionID: string; patientID: string };
  prescription: Prescription;
}

const updatePrescription = async ({
  patientID,
  updatedPrescription,
  prescriptionID,
}: {
  patientID: string;
  updatedPrescription: Prescription;
  prescriptionID: string;
}): Promise<Prescription | null> => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/appointments/${prescriptionID}/`,
      {
        updatedPrescription,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      console.log("Failed to update prescription");
      return null;
    }

    const data = response.data;
    console.log("Response", data);
    return data;
  } catch (error) {
    console.error("Failed to update prescription", error);
    return null;
  }
};

const EditPrescription = ({ params, prescription }: EditPrescriptionsProps) => {
  const { patientID, prescriptionID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log(prescription);
  const router = useRouter();
  const handleUpdate = async (updatedPrescription: Prescription) => {
    setLoading(true);
    setError(false);
    const result = await updatePrescription({
      patientID,
      updatedPrescription,
      prescriptionID,
    });
    setLoading(false);
    if (result) {
      return router.push(
        `/patients/${patientID}/prescriptions/${prescriptionID}`
      );
    }
    setError(true);
  };

  return (
    <>
      {error && <p className="text-red-500">Error fetching prescription</p>}
      <PrescriptionForm
        prescription={prescription as Prescription}
        handlerFunction={handleUpdate}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default EditPrescription;
