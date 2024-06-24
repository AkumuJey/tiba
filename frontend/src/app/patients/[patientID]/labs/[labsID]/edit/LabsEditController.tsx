"use client";
import LabsForm from "@/components/LabsForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LabResults {
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}

interface EditLabsProps {
  params: { labsID: string; patientID: string };
  labResults: LabResults;
}

const updateLabResults = async ({
  patientID,
  details,
  labsID,
}: {
  patientID: string;
  details: LabResults;
  labsID: string;
}) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/labs/${labsID}`,
      details,
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

const LabsEditController = ({ params, labResults }: EditLabsProps) => {
  const { labsID, patientID } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const handleUpdate = async (data: LabResults) => {
    setLoading(true);
    setError(false);
    const result = await updateLabResults({
      patientID,
      details: data,
      labsID,
    });
    setLoading(false);
    if (result) {
      return router.push(`/patients/${patientID}/labs/${result.id}`);
    }
    setError(true);
  };
  return (
    <>
      <LabsForm
        handlerFunction={(data) => handleUpdate(data)}
        labResults={labResults as LabResults}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default LabsEditController;
