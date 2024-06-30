"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import { EditableMedicalHistory, updateHistory } from "@/lib/medicalHistory";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditHistoryProps {
  medicalHistory: EditableMedicalHistory;
  params: { medicalHistoryID: string; patientID: string };
}

const EditHistoryController = ({
  params,
  medicalHistory,
}: EditHistoryProps) => {
  const { medicalHistoryID, patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const handleUpdate = async (historyUpdate: EditableMedicalHistory) => {
    setLoading(true);
    setError(false);
    const result = await updateHistory({
      patientID,
      historyUpdate,
      medicalHistoryID,
    });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/medical-histories/${result}`);
    }
    setError(true);
  };
  return (
    <>
      <MedicalHistoryForm
        handlerFunction={(data) => handleUpdate(data)}
        medHistory={medicalHistory as EditableMedicalHistory}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default EditHistoryController;
