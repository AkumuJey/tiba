import EditPrescription from "./PrescriptionFormController.tsx";
import { fetchPrescription, Prescription } from "@/lib/prescription";

const PrescriptionFormController = async ({
  params,
}: {
  params: { patientID: string; prescriptionID: string };
}) => {
  const { patientID, prescriptionID } = params;
  const prescription: Prescription = await fetchPrescription({
    patientID,
    prescriptionID,
  });

  const prescriptionProp = {
    ...prescription,
    drugs: prescription.prescriptionDetails,
  };

  console.log(prescriptionProp);

  return (
    <>
      <EditPrescription params={params} prescription={prescriptionProp} />
    </>
  );
};

export default PrescriptionFormController;
