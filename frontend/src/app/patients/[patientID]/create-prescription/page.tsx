import PrescriptionForm from "@/components/PrescriptionForm";
import React from "react";

interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

interface FormData {
  date: string;
  instruction?: string;
  drugs: Drug[];
}

const CreatePrescriptionPage: React.FC = () => {
  return (
    <>
      <PrescriptionForm />
    </>
  );
};

export default CreatePrescriptionPage;
