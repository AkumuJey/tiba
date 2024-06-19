"use client";

import LabsForm from "@/components/LabsForm";
import axios from "axios";
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
  details,
}: {
  patientID: string;
  details: LabResults;
}) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/provider/${patientID}/labs/`,
      {
        details,
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
  return (
    <>
      <LabsForm
        handlerFunction={(labResults) =>
          postLabResults({ patientID, details: labResults })
        }
      />
    </>
  );
};

export default CreateLabsPage;
