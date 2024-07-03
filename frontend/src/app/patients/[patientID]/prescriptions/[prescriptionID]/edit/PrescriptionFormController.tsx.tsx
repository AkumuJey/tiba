"use client";
import PrescriptionForm from "@/components/PrescriptionForm";
import { updatePrescription } from "@/lib/prescription";
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

const EditPrescription = ({ params, prescription }: EditPrescriptionsProps) => {
  const { patientID, prescriptionID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleUpdate = async (updatedPresc: Prescription) => {
    console.log("received", updatedPresc);
    setLoading(true);
    setError(false);
    const result = await updatePrescription({
      patientID,
      updatedPresc,
      prescriptionID,
    });
    if (result) {
      return router.replace(
        `/patients/${patientID}/prescriptions/${prescriptionID}`
      );
    }
    setLoading(false);
    setError(true);
  };

  return (
    <>
      {error && <p className="text-red-500">Error making updates</p>}
      <PrescriptionForm
        prescription={prescription as Prescription}
        handlerFunction={(data) => handleUpdate(data as Prescription)}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default EditPrescription;
