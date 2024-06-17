"use client";
import PrescriptionForm from "@/components/PrescriptionForm";
import { addPrescription } from "./actions";

interface CreatePrescriptionsProps {
  params: { patientID: string };
}

const CreatePrescriptionPage = ({ params }: CreatePrescriptionsProps) => {
  const { patientID } = params;
  return (
    <>
      <PrescriptionForm
        handlerFunction={(prescription) =>
          addPrescription({ patientID, prescription })
        }
      />
    </>
  );
};

export default CreatePrescriptionPage;
