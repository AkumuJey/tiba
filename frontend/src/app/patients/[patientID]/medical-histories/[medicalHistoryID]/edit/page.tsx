"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
interface MedicalHistory {
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}

interface EditHistoryProps {
  params: { medicalHistoryID: string; patientID: string };
}

const fetchHistory = async ({
  patientID,
  medicalHistoryID,
}: {
  patientID: string;
  medicalHistoryID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/histories/${medicalHistoryID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically handle cookies
      }
    );

    if (response.status === (200 || 201)) {
      return response.data.appointment;
    } else {
      console.log("Failed to fetch medical histories");
      return [];
    }
  } catch (error) {
    console.error("Error fetching medical histories:", error);
    return [];
  }
};

const updateHistory = async ({
  patientID,
  details,
  medicalHistoryID,
}: {
  patientID: string;
  details: MedicalHistory;
  medicalHistoryID: string;
}) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/histories/${medicalHistoryID}`,
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
const EditMedicalHistory = ({ params }: EditHistoryProps) => {
  const { medicalHistoryID, patientID } = params;
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const fetchedHistory = await fetchHistory({
        patientID,
        medicalHistoryID,
      });
      if (fetchedHistory) {
        setMedicalHistory(fetchedHistory);
      }
    };

    fetchData();
  }, [patientID, medicalHistoryID]);

  const router = useRouter();
  const handleUpdate = async (data: MedicalHistory) => {
    const result = await updateHistory({
      patientID,
      details: data,
      medicalHistoryID,
    });

    if (result) {
      router.push("/"); // Redirect to the homepage after successful update
    }
  };
  return (
    <>
      <MedicalHistoryForm
        handlerFunction={(medicalHistory) => handleUpdate(medicalHistory)}
        medHistory={medicalHistory as MedicalHistory}
      />
    </>
  );
};

export default EditMedicalHistory;
