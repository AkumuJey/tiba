import { EditableMedicalHistory, fetchHistory } from "@/lib/medicalHistory";
import EditHistoryController from "./EditHistoryController";
import { getCookies } from "@/lib/getCookies";

interface EditHistoryProps {
  params: { medicalHistoryID: string; patientID: string };
}

const EditMedicalHistory = async ({ params }: EditHistoryProps) => {
  const { medicalHistoryID, patientID } = params;
  const cookieHeader = getCookies();
  const medicalHistory: EditableMedicalHistory = await fetchHistory({
    medicalHistoryID,
    patientID,
    cookieHeader,
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
