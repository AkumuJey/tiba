import providerApi from "./axios";

export interface PrescriptionDetail {
  id: number;
  createdAt: string;
  prescriptionID: number;
  healthcareProviderID: number;
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}
export interface Prescription {
  id: number;
  createdAt: string;
  patientID: number;
  healthcareProviderID: number;
  medicalHistoryID: number | null;
  date: string;
  instruction: string;
  prescriptionDetails: PrescriptionDetail[];
}

interface Drug {
  quantity: number;
  units: string;
  route: string;
  drugName: string;
  durationInDays: number;
}

export interface EditablePrescription {
  date: string;
  instruction?: string;
  drugs: Drug[];
}

export const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { formattedDate, formattedTime };
};

export const fetchPrescriptions = async ({
  patientID,
  cookieHeader,
}: {
  patientID: string;
  cookieHeader: string;
}) => {
  try {
    const response = await providerApi.get(`/${patientID}/prescription/`, {
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data.prescriptions;
  } catch (error) {
    return null;
  }
};

export const fetchPrescription = async ({
  patientID,
  prescriptionID,
  cookieHeader,
}: {
  patientID: string;
  prescriptionID: string;
  cookieHeader: string;
}) => {
  try {
    const response = await providerApi.get(
      `/${patientID}/prescription/${prescriptionID}`,
      {
        headers: {
          Cookie: cookieHeader,
        },
      }
    );
    return response.data.prescription;
  } catch (error) {
    return null;
  }
};

export const updatePrescription = async ({
  patientID,
  updatedPresc,
  prescriptionID,
}: {
  patientID: string;
  updatedPresc: EditablePrescription;
  prescriptionID: string;
}): Promise<Prescription | null> => {
  try {
    const response = await providerApi.patch(
      `/${patientID}/appointments/${prescriptionID}/`,
      {
        ...updatedPresc,
        prescriptionDetails: updatedPresc.drugs,
      }
    );

    return response.data.id;
  } catch (error) {
    return null;
  }
};

export const addPrescription = async ({
  patientID,
  prescription,
}: {
  patientID: string;
  prescription: EditablePrescription;
}) => {
  try {
    const response = await providerApi.post(`/${patientID}/prescription/`, {
      ...prescription,
      prescriptionDetails: prescription.drugs,
    });
    return response.data.prescription;
  } catch (error) {
    return null;
  }
};

export const deletePrescription = async ({
  patientID,
  prescriptionID,
}: {
  patientID: string;
  prescriptionID: string;
}) => {
  try {
    const response = await providerApi.delete(
      `/${patientID}/prescription/${prescriptionID}`
    );
    return response.data.deletedPrescription;
  } catch (error) {
    return null;
  }
};
export const deleteDrug = async ({
  patientID,
  prescriptionID,
  drugID,
}: {
  patientID: string;
  prescriptionID: string;
  drugID: string;
}) => {
  try {
    const response = await providerApi.delete(
      `/${patientID}/prescription/${prescriptionID}/${drugID}`
    );
    return response.data.deletedPrescriptionDetail;
  } catch (error) {
    return null;
  }
};
export const editDrug = async ({
  patientID,
  prescriptionID,
  drugID,
}: {
  patientID: string;
  prescriptionID: string;
  drugID: string;
}) => {
  try {
    const response = await providerApi.patch(
      `/${patientID}/prescription/${prescriptionID}/${drugID}`
    );
    return response.data.updatedPrescriptionDetail;
  } catch (error) {
    return null;
  }
};
