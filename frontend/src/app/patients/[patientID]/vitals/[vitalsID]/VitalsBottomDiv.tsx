"use client";
import EditDeleteItem from "@/components/EditDeleteItem";
import { deleteVitals } from "@/lib/vitals";

const VitalsBottomDiv = ({
  patientID,
  vitalsID,
}: {
  patientID: string;
  vitalsID: string;
}) => {
  return (
    <EditDeleteItem
      deleteFunction={() => deleteVitals({ patientID, vitalsID })}
    />
  );
};

export default VitalsBottomDiv;
