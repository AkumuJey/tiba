"use client";
import LabsForm from "@/components/LabsForm";
import { LabResults, updateLabResults } from "./actions";

interface EditLabsProps {
  params: { labsID: string; patientID: string };
  searchParams: LabResults;
}
const EditLabResults = ({ params, searchParams }: EditLabsProps) => {
  const { labsID, patientID } = params;
  return (
    <>
      <LabsForm
        handlerFunction={(labResults) =>
          updateLabResults({ patientID, labResults, labsID })
        }
        labResults={searchParams}
      />
    </>
  );
};

export default EditLabResults;
