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
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";
const updateLabResults = async ({
  patientID,
  labResults,
  labsID,
}: {
  patientID: string;
  labResults: LabResults;
  labsID: string;
}) => {
  console.log(labResults);
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/labs/${labsID}`,
    {
      method: "PATCH",
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
