"use client";
import VitalsForm from "@/components/VitalsForm";
import { addVitalsResults, VitalsResultsEdit } from "@/lib/vitals";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateVitalsProps {
  params: { patientID: string };
}

const CreateVitalsPage = ({ params }: CreateVitalsProps) => {
  const { patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleNewVitals = async (vitals: VitalsResultsEdit) => {
    setLoading(true);
    setError(false);
    const result = await addVitalsResults({ vitals, patientID });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/vitals/`);
    }
    setError(true);
  };
  return (
    <>
      <VitalsForm
        handlerFunction={(data) => handleNewVitals(data)}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default CreateVitalsPage;
