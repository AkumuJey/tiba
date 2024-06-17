"use client";
import PrescriptionForm from "@/components/PrescriptionForm";

interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

interface FormData {
  date: string;
  instruction?: string;
  drugs: Drug[];
}
interface CreatePrescriptionsProps {
  params: { patientID: string };
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const addPrescription = async ({
  patientID,
  prescription,
}: {
  patientID: string;
  prescription: FormData;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/prescription/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      body: JSON.stringify(prescription),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};

const CreatePrescriptionPage = ({ params }: CreatePrescriptionsProps) => {
  const { patientID } = params;
  return (
    <>
      <PrescriptionForm
        handlerFunction={(prescription) =>
          addPrescription({ patientID, prescription })
        }
      />
    </>
  );
};

export default CreatePrescriptionPage;
