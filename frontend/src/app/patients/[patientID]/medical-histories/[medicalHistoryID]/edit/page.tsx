"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import React from "react";
import { MedicalHistory, updateHistory } from "./actions";
interface EditHistoryProps {
  params: { medicalHistoryID: string; patientID: string };
  searchParams: MedicalHistory;
}
const EditMedicalHistory = ({ params, searchParams }: EditHistoryProps) => {
  const { medicalHistoryID, patientID } = params;
  return (
    <>
      <MedicalHistoryForm
        handlerFunction={(medicalHistory) =>
          updateHistory({ medicalHistory, medicalHistoryID, patientID })
        }
        medHistory={searchParams}
      />
    </>
  );
};

export default EditMedicalHistory;
