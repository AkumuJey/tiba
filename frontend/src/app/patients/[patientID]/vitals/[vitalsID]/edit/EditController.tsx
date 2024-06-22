"use client";
import VitalsForm from "@/components/VitalsForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export interface VitalsResults {
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}

interface EditVitalsControllerProps {
  params: { vitalsID: string; patientID: string };
  vitals: VitalsResults;
}

const updateVitals = async ({
  patientID,
  updatedVitals,
  vitalsID,
}: {
  patientID: string;
  updatedVitals: VitalsResults;
  vitalsID: string;
}) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/vitals/${vitalsID}`,
      {
        ...updatedVitals,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.status !== 201) {
      console.log("Failed");
      return;
    }
    return response.data;
  } catch (error) {
    console.error("Failed to update appointment", error);
    return;
  }
};

const EditVitalsController = ({
  params,
  vitals,
}: EditVitalsControllerProps) => {
  const { vitalsID, patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const handleUpdate = async (updatedVitals: VitalsResults) => {
    setLoading(true);
    setError(false);
    const result = await updateVitals({
      patientID,
      updatedVitals,
      vitalsID,
    });
    setLoading(false);
    if (result.id) {
      return router.push(`/patients/${patientID}/vitals/${result.id}`);
    }
    setError(true);
  };
  return (
    <>
      <VitalsForm
        handlerFunction={(data) => handleUpdate(data)}
        vitals={vitals as VitalsResults}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default EditVitalsController;
