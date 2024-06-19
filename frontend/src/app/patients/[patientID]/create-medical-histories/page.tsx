"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MedicalHistory {
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}
interface CreateHistoryProps {
  params: { patientID: string };
}

const addHistory = async ({
  patientID,
  medicalHistory,
}: {
  patientID: string;
  medicalHistory: MedicalHistory;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/provider/${patientID}/histories/`,
      {
        medicalHistory,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status !== 201) {
      console.log("Failed");
      return;
    }

    const data = response.data;
    console.log("Response", data);
    return data;
  } catch (error) {
    console.error("Failed to update medical history", error);
    return;
  }
};

const CreateHistoriesPage = ({ params }: CreateHistoryProps) => {
  const { patientID } = params;

  const router = useRouter();
  const handleNewHistory = async (medicalHistory: MedicalHistory) => {
    const result = await addHistory({
      patientID,
      medicalHistory,
    });

    if (result) {
      router.push(`/patients/${patientID}/medical-histories/`);
    }
  };
  return (
    <>
      <MedicalHistoryForm handlerFunction={handleNewHistory} />
    </>
  );
};

export default CreateHistoriesPage;
