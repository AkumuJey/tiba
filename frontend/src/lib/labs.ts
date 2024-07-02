import providerApi from "./axios";

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

export const fetchLabResultsList = async ({
  patientID,
  cookieHeader,
}: {
  patientID: string;
  cookieHeader: string;
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
  cookieHeader,
}: {
  patientID: string;
  labsID: string;
  cookieHeader: string;
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

export const postLabResults = async ({
  patientID,
  labResults,
}: {
  patientID: string;
  labResults: EditedLabResults;
}) => {
  try {
    const response = await providerApi.post(`/${patientID}/labs/`, labResults);
    return response.data.newHospitalLabs;
  } catch (error) {
    return null;
  }
};

export const deleteLabResults = async ({
  patientID,
  labsID,
}: {
  patientID: string;
  labsID: string;
}) => {
  try {
    const response = await providerApi.delete(
      `http://localhost:4000/provider/${patientID}/labs/${labsID}`
    );
    return response.data.deletedHospitalLabs;
  } catch (error) {
    return null;
  }
};
