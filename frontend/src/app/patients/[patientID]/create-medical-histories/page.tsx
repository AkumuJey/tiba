"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import { addHistory, EditableMedicalHistory } from "@/lib/medicalHistory";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateHistoryProps {
  params: { patientID: string };
}

const CreateHistoriesPage = ({ params }: CreateHistoryProps) => {
  const { patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleNewHistory = async (medicalHistory: EditableMedicalHistory) => {
    setLoading(true);
    setError(false);
    const result = await addHistory({
      patientID,
      medicalHistory,
    });

    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/medical-histories/`);
    }
    setError(true);
  };
  return (
    <>
      <MedicalHistoryForm
        handlerFunction={(data) => handleNewHistory(data)}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default CreateHistoriesPage;
