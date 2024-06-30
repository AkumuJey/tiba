import providerApi from "./axios";
import { getCookies } from "./getCookies";

export interface EditedLabResults {
  bloodSugar: number;
  cholesterol: number;
  LDL: number;
  HDL: number;
  triglyceride: number;
  findings: string;
  labName: string;
}

export interface Labresults extends EditedLabResults {
  id: number;
  createdAt: string;
  patientID: number;
}

const cookieHeader = getCookies();
export const fetchLabResultsList = async ({
  patientID,
}: {
  patientID: string;
}) => {
  try {
    const response = await providerApi.get(
      `http://localhost:4000/provider/${patientID}/labs/`,
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    return response.data.hospitalLabsResultsList;
  } catch (error) {
    return null;
  }
};

export const fetchLabResults = async ({
  patientID,
  labsID,
}: {
  patientID: string;
  labsID: string;
}) => {
  try {
    const response = await providerApi.get(`/${patientID}/labs/${labsID}`, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return response.data.hospitalLabsResults;
  } catch (error) {
    return null;
  }
};

export const updateLabResults = async ({
  patientID,
  details,
  labsID,
}: {
  patientID: string;
  details: EditedLabResults;
  labsID: string;
}) => {
  try {
    const response = await providerApi.patch(
      `/${patientID}/labs/${labsID}`,
      details
    );

    return response.data;
  } catch (error) {
    return null;
  }
};
