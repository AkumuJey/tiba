"use client";
import PrescriptionForm from "@/components/PrescriptionForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface CreatePrescriptionsProps {
  params: { patientID: string };
}

interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

interface Prescription {
  date: string;
  instruction?: string;
  drugs: Drug[];
}

const addPrescription = async ({
  patientID,
  prescription,
}: {
  patientID: string;
  prescription: Prescription;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/provider/${patientID}/appointments/`,
      {
        prescription,
      },
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

    const data = response.data;
    console.log("Response", data);
    return data;
  } catch (error) {
    console.error("Failed to update appointment", error);
    return;
  }
};

const CreatePrescriptionPage = ({ params }: CreatePrescriptionsProps) => {
  const { patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleNewPrescription = async (prescription: Prescription) => {
    setLoading(true);
    setError(false);
    const result = await addPrescription({ patientID, prescription });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/prescriptions/`);
    }
    setError(true);
  };
  return (
    <>
      <PrescriptionForm
        handlerFunction={handleNewPrescription}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default CreatePrescriptionPage;
