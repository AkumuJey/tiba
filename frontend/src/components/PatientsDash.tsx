import { Divider, List, ListItem, Paper } from "@mui/material";
import Link from "next/link";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODAyMDQ5NH0.8JDRgyP69-ywPQV_E5MTQWMYE3V6TYh9zW_n0uX1bZo";

interface Patient {
  id: number;
  firstName: string;
  lastName: string; // Include lastName to use it in concatenation
  sex: string;
}
const fetchPatients = async () => {
  const response = await fetch("http://localhost:4000/provider/patients/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearers ${token}`,
    },
    next: { revalidate: 0 },
  });
  if (!response.ok) {
    console.log("Failed");
    return;
  }
  const data = await response.json();
  return data.patients;
};

const PatientsDash = async () => {
  const patients: Patient[] = await fetchPatients();
  return (
    <List className="flex bg-[#DCD6D6] flex-col w-[90%] md:w-1/4">
      {patients && (
        <>
          {patients.map((patient, index) => (
            <>
              <Link
                href={`/patients/${patient.id}`}
                key={patient.id}
                className="w-full h-full"
              >
                <ListItem className="flex w-full justify-between hover:bg-[#C1BABA]">
                  <div className="w-[10%]">{patient.id}</div>
                  <div className="w-[70%]">
                    {patient.firstName + " " + patient.lastName}
                  </div>
                  <div className="w-[20%]">{patient.sex}</div>
                </ListItem>
              </Link>
              {index !== patients.length - 1 && (
                <Divider variant="middle" component="li" />
              )}
            </>
          ))}
        </>
      )}
    </List>
  );
};

export default PatientsDash;
