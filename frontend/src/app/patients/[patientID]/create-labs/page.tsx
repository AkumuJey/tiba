"use client";

import LabsForm from "@/components/LabsForm";

interface LabResults {
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const addLaboratoryResults = async ({
  patientID,
  labResults,
}: {
  patientID: string;
  labResults: LabResults;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/labs/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(labResults),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};
interface CreateLabsProps {
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
