"use client";
import VitalsForm from "@/components/VitalsForm";
import { updateVitals, VitalsResultsEdit } from "@/lib/vitals";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditVitalsControllerProps {
  params: { vitalsID: string; patientID: string };
  vitals: VitalsResultsEdit;
}

const EditVitalsController = ({
  params,
  vitals,
}: EditVitalsControllerProps) => {
  const { vitalsID, patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const handleUpdate = async (editedVitals: VitalsResultsEdit) => {
    setLoading(true);
    setError(false);
    const result = await updateVitals({
      patientID,
      editedVitals,
      vitalsID,
    });
    setLoading(false);
    if (result.id) {
      return router.push(`/patients/${patientID}/vitals/${result}`);
    }
    setError(true);
  };
  return (
    <>
      <VitalsForm
        handlerFunction={(data) => handleUpdate(data)}
        vitals={vitals as VitalsResultsEdit}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default EditVitalsController;
