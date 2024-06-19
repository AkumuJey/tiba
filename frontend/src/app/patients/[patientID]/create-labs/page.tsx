"use client";

import LabsForm from "@/components/LabsForm";
import axios from "axios";
import { useRouter } from "next/navigation";
export interface CreateLabsProps {
  params: { patientID: string };
}

export interface LabResults {
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}
const postLabResults = async ({
  patientID,
  labResults,
}: {
  patientID: string;
  labResults: LabResults;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/provider/${patientID}/labs/`,
      {
        labResults,
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

const CreateLabsPage = ({ params }: CreateLabsProps) => {
  const { patientID } = params;

  const router = useRouter();
  const handleNewLabs = async (labResults: LabResults) => {
    const result = await postLabResults({ patientID, labResults });
    if (result) {
      router.push(`/patients/${patientID}/labs/`);
    }
  };
  return (
    <>
      <LabsForm handlerFunction={handleNewLabs} />
    </>
  );
};

export default CreateLabsPage;
