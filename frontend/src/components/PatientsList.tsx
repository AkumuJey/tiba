import { fetchPatients } from "@/lib/patientsUtils";
import { Divider, List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
}

interface PatientsListProps {
  limit?: number;
}

const PatientsList = async ({ limit }: PatientsListProps) => {
  const patients: Patient[] = await fetchPatients({ limit });
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div
      className={`${limit ? "w-full md:w-1/2" : "w-full mx-auto"} bg-[#F1F6F6]`}
    >
      <Paper elevation={3} sx={{ p: 4 }} className="bg-[#F1F6F6]">
        <h5 className="font-bol text-xl">Patients</h5>
        <List>
          {patients.map((patient) => (
            <Link href={`/patients/${patient.id}`} key={patient.id}>
              <ListItem>
                <ListItemText
                  primary={`${patient.firstName} ${patient.lastName}`}
                  secondary={`Sex: ${patient.sex}, Age: ${calculateAge(
                    patient.dateOfBirth
                  )} Years`}
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </Link>
          ))}
          <ListItem>
            <Link href="/patients">Click to view more</Link>
          </ListItem>
        </List>
      </Paper>
    </div>
  );
};

export default PatientsList;
