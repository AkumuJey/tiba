"use client";
import EditDeleteItem from "@/components/EditDeleteItem";
import { deletePrescription } from "@/lib/prescription";
import { usePathname } from "next/navigation";

const BottomDiv = ({
  patientID,
  prescriptionID,
}: {
  patientID: string;
  prescriptionID: string;
}) => {
  const pathname = usePathname();
  return (
    <div>
      <EditDeleteItem
        deleteFunction={() => deletePrescription({ patientID, prescriptionID })}
        editRoute={`${pathname}/edit`}
        nextRoute={`${pathname.slice(0, pathname.lastIndexOf("/"))}`}
      />
    </div>
  );
};

export default BottomDiv;
