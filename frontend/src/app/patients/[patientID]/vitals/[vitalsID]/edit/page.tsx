import axios from "axios";
import { cookies } from "next/headers";
import EditVitalsController from "./EditController";
import { fetchVitals, Vitals } from "@/lib/vitals";

const VitalsEditPage = async ({
  params,
}: {
  params: { patientID: string; vitalsID: string };
}) => {
  const { patientID, vitalsID } = params;
  const vitals: Vitals = await fetchVitals({
    vitalsID,
    patientID,
  });

  console.log(vitals);
  return <EditVitalsController vitals={vitals} params={params} />;
};

export default VitalsEditPage;
