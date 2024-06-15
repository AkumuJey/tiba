import VitalsForm from "@/components/VitalsForm";

interface VitalsResults {
  breathingRate: number;
  systolicBP: number;
  diastolicBP: number;
  pulseRate: number;
  weightKg: number;
}

const CreateVitalsPage = () => {
  return (
    <>
      <VitalsForm />
    </>
  );
};

export default CreateVitalsPage;
