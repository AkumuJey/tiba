import { Divider, List, ListItem, ListItemText, Paper } from "@mui/material";
import Link from "next/link";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
}

interface PatientsDashProps {
  patients: Patient[];
}

const PatientsDash = ({ patients }: PatientsDashProps) => {
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="w-full md:w-1/2">
      <Paper elevation={3} sx={{ p: 4 }}>
        <h6>Patients</h6>
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

export default PatientsDash;
