import { EditableMedicalHistory, fetchHistory } from "@/lib/medicalHistory";
import EditHistoryController from "./EditHistoryController";

interface EditHistoryProps {
  params: { medicalHistoryID: string; patientID: string };
}

const EditMedicalHistory = async ({ params }: EditHistoryProps) => {
  const { medicalHistoryID, patientID } = params;

  const medicalHistory: EditableMedicalHistory = await fetchHistory({
    medicalHistoryID,
    patientID,
  });
  return (
    <>
      {!medicalHistory ? (
        <div>Error loading medical history page</div>
      ) : (
        <EditHistoryController
          medicalHistory={medicalHistory}
          params={params}
        />
      )}
    </>
  );
};

export default EditMedicalHistory;
