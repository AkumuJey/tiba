"use client";
import LabsForm from "@/components/LabsForm";
import { EditedLabResults, updateLabResults } from "@/lib/labs";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditLabsProps {
  params: { labsID: string; patientID: string };
  labResults: EditedLabResults;
}

const LabsEditController = ({ params, labResults }: EditLabsProps) => {
  const { labsID, patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const handleUpdate = async (data: EditedLabResults) => {
    setLoading(true);
    setError(false);
    const result = await updateLabResults({
      patientID,
      details: data,
      labsID,
    });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/labs/${result.id}`);
    }
    setError(true);
  };
  return (
    <>
      <LabsForm
        handlerFunction={(data) => handleUpdate(data)}
        labResults={labResults as EditedLabResults}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default LabsEditController;
