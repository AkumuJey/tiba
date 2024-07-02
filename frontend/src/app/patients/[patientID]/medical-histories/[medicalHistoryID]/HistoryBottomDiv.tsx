"use client";
import EditDeleteItem from "@/components/EditDeleteItem";
import { deleteHistory } from "@/lib/medicalHistory";

const HistoryBottomDiv = ({
  patientID,
  medicalHistoryID,
}: {
  patientID: string;
  medicalHistoryID: string;
}) => {
  return (
    <EditDeleteItem
      deleteFunction={() => deleteHistory({ patientID, medicalHistoryID })}
    />
  );
};

export default HistoryBottomDiv;
