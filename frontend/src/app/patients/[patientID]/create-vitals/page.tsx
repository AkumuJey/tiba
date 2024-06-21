"use client";
import VitalsForm from "@/components/VitalsForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateVitalsProps {
  params: { patientID: string };
}

interface VitalsResults {
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}

const addVitalsResults = async ({
  patientID,
  vitals,
}: {
  patientID: string;
  vitals: VitalsResults;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/provider/${patientID}/vitals/`,
      vitals,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      console.log("Failed");
      return;
    }
    return response.data;
  } catch (error) {
    console.error("Failed to update appointment", error);
    return;
  }
};
const CreateVitalsPage = ({ params }: CreateVitalsProps) => {
  const { patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleNewVitals = async (vitals: VitalsResults) => {
    setLoading(true);
    setError(false);
    const result = await addVitalsResults({ vitals, patientID });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/vitals/`);
    }
    setError(true);
  };
  return (
    <>
      <VitalsForm
        handlerFunction={(data) => handleNewVitals(data)}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default CreateVitalsPage;
