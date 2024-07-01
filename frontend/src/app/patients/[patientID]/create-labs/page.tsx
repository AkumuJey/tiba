"use client";

import LabsForm from "@/components/LabsForm";
import { EditedLabResults, postLabResults } from "@/lib/labs";
import { useRouter } from "next/navigation";
import { useState } from "react";
export interface CreateLabsProps {
  params: { patientID: string };
}

const CreateLabsPage = ({ params }: CreateLabsProps) => {
  const { patientID } = params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const handleNewLabs = async (labResults: EditedLabResults) => {
    setLoading(true);
    setError(false);
    const result = await postLabResults({ patientID, labResults });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/labs/`);
    }
    setError(true);
  };
  return (
    <>
      <LabsForm
        handlerFunction={(data) => handleNewLabs(data)}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default CreateLabsPage;
