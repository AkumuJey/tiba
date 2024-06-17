"use client";

import LabsForm from "@/components/LabsForm";
import { addLaboratoryResults } from "./actions";
export interface CreateLabsProps {
  params: { patientID: string };
}

const CreateLabsPage = ({ params }: CreateLabsProps) => {
  const { patientID } = params;
  return (
    <>
      <LabsForm
        handlerFunction={(labResults) =>
          addLaboratoryResults({ patientID, labResults })
        }
      />
    </>
  );
};

export default CreateLabsPage;
