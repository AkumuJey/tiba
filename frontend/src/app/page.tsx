import Image from "next/image";

// types.ts
export interface Patient {
  id: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  address: string;
  email: string;
  password: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string | null;
  subscribed: boolean;
}

const login = async () => {
  let patient: Patient | null = null;
  let error = false;
  const details = {
    email: "john.doe@gamil.com",
    password: "securePass123",
  };
  const response = await fetch("http://localhost:4000/patient/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(details),
  });
  if (response.ok) {
    const data = await response.json();
    patient = data.patient as Patient;
    console.log(patient);
  } else {
    error = true;
  }
  return { patient, error };
};

export default async function Home() {
  const { patient, error } = await login();
  if (error) {
    return <div>Failed</div>;
  }
  if (!patient) {
    return <div>Missing</div>;
  }
  console.log("Stage 3     ", patient.email);
  return (
    <main className="m-0 p-0">
      <div>
        <h2>Patient Information</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>ID:</strong>
              </td>
              <td>{patient?.id}</td>
            </tr>
            <tr>
              <td>
                <strong>Created At:</strong>
              </td>
              <td>{new Date(patient?.createdAt).toLocaleString()}</td>
            </tr>
            <tr>
              <td>
                <strong>First Name:</strong>
              </td>
              <td>{patient?.firstName}</td>
            </tr>
            <tr>
              <td>
                <strong>Last Name:</strong>
              </td>
              <td>{patient?.lastName}</td>
            </tr>
            <tr>
              <td>
                <strong>Date of Birth:</strong>
              </td>
              <td>{new Date(patient?.dateOfBirth).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>
                <strong>Sex:</strong>
              </td>
              <td>{patient?.sex}</td>
            </tr>
            <tr>
              <td>
                <strong>Address:</strong>
              </td>
              <td>{patient?.address}</td>
            </tr>
            <tr>
              <td>
                <strong>Email:</strong>
              </td>
              <td>{patient?.email}</td>
            </tr>
            <tr>
              <td>
                <strong>Phone Number:</strong>
              </td>
              <td>{patient?.phoneNumber}</td>
            </tr>
            <tr>
              <td>
                <strong>Emergency Contact Name:</strong>
              </td>
              <td>{patient?.emergencyContactName}</td>
            </tr>
            <tr>
              <td>
                <strong>Emergency Contact Phone:</strong>
              </td>
              <td>{patient?.emergencyContactPhone || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Subscribed:</strong>
              </td>
              <td>{patient?.subscribed ? "Yes" : "No"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
