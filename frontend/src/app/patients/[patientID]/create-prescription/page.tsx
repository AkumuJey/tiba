"use client";
import PrescriptionForm from "@/components/PrescriptionForm";
import { addPrescription, EditablePrescription } from "@/lib/prescription";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface CreatePrescriptionsProps {
  params: { patientID: string };
}

const CreatePrescriptionPage = ({ params }: CreatePrescriptionsProps) => {
  const { patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleNewPrescription = async (prescription: EditablePrescription) => {
    setLoading(true);
    setError(false);
    const result = await addPrescription({ patientID, prescription });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/prescriptions/`);
    }
    setError(true);
  };
  return (
    <>
      <PrescriptionForm
        handlerFunction={(data) =>
          handleNewPrescription(data as EditablePrescription)
        }
        error={error}
        loading={loading}
      />
    </>
  );
};

export default CreatePrescriptionPage;
