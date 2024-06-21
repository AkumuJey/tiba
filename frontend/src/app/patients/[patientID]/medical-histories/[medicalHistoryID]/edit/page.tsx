"use client";
import MedicalHistoryForm from "@/components/MedicalHistoryForm";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
    console.log(response);
    if (response.status === (200 || 201)) {
      const { medicalHistory } = await response.data.medicalHistory;
      return medicalHistory;
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
  historyUpdate,
  medicalHistoryID,
}: {
  patientID: string;
  historyUpdate: MedicalHistory;
  medicalHistoryID: string;
}) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/histories/${medicalHistoryID}`,
      {
        ...historyUpdate,
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
    console.error("Failed to update medical history", error);
    return;
  }
};
const EditMedicalHistory = ({ params }: EditHistoryProps) => {
  const { medicalHistoryID, patientID } = params;
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const fetchedHistory = await fetchHistory({
        patientID,
        medicalHistoryID,
      });
      console.log(fetchedHistory);
      if (fetchedHistory) {
        setMedicalHistory(fetchedHistory);
      }
    };

    fetchData();
  }, [patientID, medicalHistoryID]);

  const router = useRouter();
  const handleUpdate = async (historyUpdate: MedicalHistory) => {
    try {
      setLoading(true);
      setError(false);
      const result = await updateHistory({
        patientID,
        historyUpdate,
        medicalHistoryID,
      });
      setLoading(false);
      return router.push(
        `/patients/${patientID}/medical-histories/${result.id}`
      );
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <MedicalHistoryForm
        handlerFunction={(data) => handleUpdate(data)}
        medHistory={medicalHistory as MedicalHistory}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default EditMedicalHistory;
