import Link from "next/link";
import React from "react";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
}
interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({
  patient,
}: PatientCardProps) => {
  const { id, firstName, lastName, sex } = patient;
  return (
    <Link href={`/patients/${id}`}>
      <div className="shadow-sm rounded-lg flex justify-start gap-2">
        <div className="text-xl font-bold mb-2">
          {firstName} {lastName}
        </div>
        <div className="text-gray-700 mb-1">
          <strong>ID:</strong> {id}
        </div>
        <div className="text-gray-700 mb-1">
          <strong>Sex:</strong> {sex}
        </div>
      </div>
    </Link>
  );
};

export default PatientCard;
