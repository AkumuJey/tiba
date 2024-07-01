import { getCookies } from "@/lib/getCookies";
import { fetchVitals, Vitals } from "@/lib/vitals";
import EditVitalsController from "./EditController";

const VitalsEditPage = async ({
  params,
}: {
  params: { patientID: string; vitalsID: string };
}) => {
  const { patientID, vitalsID } = params;
  const cookieHeader = getCookies();
  const vitals: Vitals = await fetchVitals({
    vitalsID,
    patientID,
    cookieHeader,
  });

  console.log(vitals);
  return <EditVitalsController vitals={vitals} params={params} />;
};

export default VitalsEditPage;
