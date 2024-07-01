import axios from "axios";
import { cookies } from "next/headers";
import LabsEditController from "./LabsEditController";
import { EditedLabResults, fetchLabResults } from "@/lib/labs";
import { getCookies } from "@/lib/getCookies";

const EditVitalsPage = async ({
  params,
}: {
  params: { patientID: string; labsID: string };
}) => {
  const { patientID, labsID } = params;
  const cookieHeader = getCookies();
  const labResults: EditedLabResults = await fetchLabResults({
    labsID,
    patientID,
    cookieHeader,
  });

  return (
    <>
      {!labResults ? (
        <div>Error loading edit page</div>
      ) : (
        <LabsEditController params={params} labResults={labResults} />
      )}
    </>
  );
};

export default EditVitalsPage;
