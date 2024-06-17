"use client";
import PrescriptionForm from "@/components/PrescriptionForm";
import { FormData, updatePrescription } from "./actions";

interface EditPrescriptionsProps {
  params: { prescriptionID: string; vitalsID: string; patientID: string };
  searchParams: FormData;
}

const EditPrescription = ({ params, searchParams }: EditPrescriptionsProps) => {
  const { patientID, prescriptionID } = params;
  return (
    <>
      <PrescriptionForm
        prescription={searchParams}
        handlerFunction={(prescription) =>
          updatePrescription({ patientID, prescription, prescriptionID })
        }
      />
    </>
  );
};

export default EditPrescription;
