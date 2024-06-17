export interface AppointmentData {
  venue: string;
  appointmentTime: string;
  amount: string;
  description?: string | undefined;
}

export interface Params {
  patientID: string;
}
export interface AppointmentCreationProps {
  params: Params;
}
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

export const bookAppointments = async ({
  patientID,
  details,
}: {
  patientID: string;
  details: AppointmentData;
}) => {
  const response = await fetch(
    `http://localhost:4000/provider/${patientID}/appointments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearers ${token}`,
      },
      body: JSON.stringify({
        ...details,
        amount: parseInt(details.amount, 10),
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Falied");
  }
  const data = await response.json();
  return data;
};
