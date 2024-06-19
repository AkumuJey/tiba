"use client";
import PrescriptionForm from "@/components/PrescriptionForm";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

export interface Prescription {
  date: string;
  instruction?: string;
  drugs: Drug[];
}
interface EditPrescriptionsProps {
  params: { prescriptionID: string; vitalsID: string; patientID: string };
}

const fetchPrescription = async ({
  patientID,
  prescriptionID,
}: {
  patientID: string;
  prescriptionID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/${patientID}/prescription/${prescriptionID}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Automatically handle cookies
      }
    );

    if (response.status === 200 || response.status === 201) {
      return response.data.prescription;
    } else {
      console.log("Failed to fetch prescriptions");
      return null;
    }
  } catch (error) {
    console.error("Error fetching prescription:", error);
    return null;
  }
};

const updatePrescription = async ({
  patientID,
  updatedPrescription,
  prescriptionID,
}: {
  patientID: string;
  updatedPrescription: Prescription;
  prescriptionID: string;
}) => {
  try {
    const response = await axios.patch(
      `http://localhost:4000/provider/${patientID}/appointments/${prescriptionID}/`,
      {
        updatedPrescription,
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

const EditPrescription = ({ params }: EditPrescriptionsProps) => {
  const { patientID, prescriptionID } = params;
  const [prescription, setPrescription] = useState<Prescription | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPrescription = await fetchPrescription({
        patientID,
        prescriptionID,
      });
      if (fetchedPrescription) {
        setPrescription(fetchedPrescription);
      }
    };

    fetchData();
  }, [patientID, prescriptionID]);

  const router = useRouter();
  const handleUpdate = async (updatedPrescription: Prescription) => {
    const result = await updatePrescription({
      patientID,
      updatedPrescription,
      prescriptionID,
    });

    if (result) {
      router.push(`/patients/${patientID}/prescriptions/${result.id}`);
    }
  };
  return (
    <>
      <PrescriptionForm
        prescription={prescription as Prescription}
        handlerFunction={handleUpdate}
      />
    </>
  );
};

export default EditPrescription;
