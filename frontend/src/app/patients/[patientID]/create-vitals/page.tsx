import VitalsForm from "@/components/VitalsForm";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

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
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/vitals/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vitals),
    }
  );
  if (!response.ok) {
    console.log("Failed", response);
    return;
  }
  const data = await response.json();
  return data;
};

interface CreateVitalsProps {
  params: { patientID: string };
}
const CreateVitalsPage = ({ params }: CreateVitalsProps) => {
  const { patientID } = params;
  return (
    <>
      <VitalsForm
        handlerFunction={(vitals) => addVitalsResults({ vitals, patientID })}
      />
    </>
  );
};

export default CreateVitalsPage;
