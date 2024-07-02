"use client";
import EditDeleteItem from "@/components/EditDeleteItem";
import { deleteLabResults } from "@/lib/labs";

const LabsBottomDiv = ({
  patientID,
  labsID,
}: {
  patientID: string;
  labsID: string;
}) => {
  return (
    <EditDeleteItem
      deleteFunction={() => deleteLabResults({ patientID, labsID })}
    />
  );
};

export default LabsBottomDiv;
