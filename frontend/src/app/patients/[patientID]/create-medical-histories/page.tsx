"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";

interface MedicalHistory {
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}
interface CreateHistoryProps {
  params: { patientID: string };
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const addHistory = async ({
  patientID,
  medicalHistory,
}: {
  patientID: string;
  medicalHistory: MedicalHistory;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/histories/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      body: JSON.stringify(medicalHistory),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};
const CreateHistoriesPage = ({ params }: CreateHistoryProps) => {
  const { patientID } = params;
  return (
    <>
      <MedicalHistoryForm
        handlerFunction={(medicalHistory) =>
          addHistory({ medicalHistory, patientID })
        }
      />
    </>
  );
};

export default CreateHistoriesPage;
