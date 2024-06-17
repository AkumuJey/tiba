"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import { addHistory } from "./actions";

interface CreateHistoryProps {
  params: { patientID: string };
}

const CreateHistoriesPage = ({ params }: CreateHistoryProps) => {
  const { patientID } = params;
  return (
    <>
      <MedicalHistoryForm
        handlerFunction={(medicalHistory) =>
          addHistory({ medicalHistory, patientID })
        }
      />
    </>
  );
};

export default CreateHistoriesPage;
