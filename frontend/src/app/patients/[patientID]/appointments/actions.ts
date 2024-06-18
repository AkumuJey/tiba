export interface PatientDetails {
  firstName: string;
  lastName: string;
}

export interface AppointmentDetails {
  id: number;
  createdAt: string; // ISO 8601 date string
  patientID: number;
  healthProviderID: number;
  venue: string;
  appointmentTime: string; // ISO 8601 date string
  amount: number;
  description: string;
  patient: PatientDetails;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

const fetchPatientAppointments = async (patientID: string) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      next: { revalidate: 0 },
    }
  );
  if (!response.ok) {
    console.log("Failed");
    throw new Error("Failed");
  }
  const data = await response.json();
  console.log(data);
  return data.appointments;
};

export const useFetchPatientAppointments = async (patientID: string) => {
  let error = false;
  let appointments: AppointmentDetails[] | null = null;
  try {
    appointments = await fetchPatientAppointments(patientID);
  } catch (err) {
    error = true;
  }
  return { appointments, error };
};
