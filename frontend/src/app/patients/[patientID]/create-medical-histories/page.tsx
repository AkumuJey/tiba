"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      { ...medicalHistory },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    if (response.status !== 201) {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleNewHistory = async (medicalHistory: MedicalHistory) => {
    console.log("New  msf", medicalHistory);
    setLoading(true);
    setError(false);
    const result = await addHistory({
      patientID,
      medicalHistory,
    });

    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/medical-histories/`);
    }
    setError(true);
  };
  return (
    <>
      <MedicalHistoryForm
        handlerFunction={(data) => handleNewHistory(data)}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default CreateHistoriesPage;
