import LabsForm from "@/components/LabsForm";

interface LabResults {
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}

const CreateLabsPage = () => {
  return (
    <>
      <LabsForm />
    </>
  );
};

export default CreateLabsPage;
