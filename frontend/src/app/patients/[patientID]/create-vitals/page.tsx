import VitalsForm from "@/components/VitalsForm";
import { addVitalsResults } from "./actions";

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
