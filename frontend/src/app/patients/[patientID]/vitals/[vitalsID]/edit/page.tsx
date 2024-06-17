"use client";
import VitalsForm from "@/components/VitalsForm";
import { updateVitalsResults, VitalsResults } from "./actions";

interface EditVitalsProps {
  params: { vitalsID: string; patientID: string };
  searchParams: VitalsResults;
}

const EditVitals = ({ params, searchParams }: EditVitalsProps) => {
  const { vitalsID, patientID } = params;
  return (
    <>
      <VitalsForm
        handlerFunction={(vitals) =>
          updateVitalsResults({ patientID, vitals, vitalsID })
        }
      />
    </>
  );
};

export default EditVitals;
