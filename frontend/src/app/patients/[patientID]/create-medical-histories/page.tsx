import MedicalHistoryForm from "@/components/MedicalHistoryForm";

interface MedicalHistory {
  presentation: string;
  medicalHistory: string;
  physicalExamination: string;
  summary: string;
}

const CreateHistoriesPage = () => {
  return (
    <>
      <MedicalHistoryForm />
    </>
  );
};

export default CreateHistoriesPage;
