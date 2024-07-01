import { getCookies } from "@/lib/getCookies";
import { fetchPatient } from "@/lib/patientsUtils";
import { ContactPhone } from "@mui/icons-material";
import LocationCity from "@mui/icons-material/LocationCity";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: string;
  address: string;
  phoneNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export default async function Patient({
  params,
}: {
  params: { patientID: string };
}) {
  const { patientID } = params;
  const cookieHeader = getCookies();
  const patient: Patient = await fetchPatient({ patientID, cookieHeader });

  return (
    <div>
      {!patient ? (
        <div>Error loading patient details</div>
      ) : (
        <>
          <h2>
            <span className="font-bold text-sm">Patient ID: </span>
            {patientID}
          </h2>
          <div className="flex flex-col gap-2">
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Emergency Contact Name"
                secondary={
                  patient.emergencyContactName
                    ? " " + patient.emergencyContactName
                    : " Not Available"
                }
                primaryTypographyProps={{ variant: "subtitle1" }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <ContactPhone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Emergency Contact Phone Number"
                secondary={
                  patient.emergencyContactPhone
                    ? " " + patient.emergencyContactPhone
                    : " Not Available"
                }
                primaryTypographyProps={{ variant: "subtitle1" }}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <LocationCity />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Patient Address"
                secondary={
                  patient.address ? " " + patient.address : " Not Available"
                }
                primaryTypographyProps={{ variant: "subtitle1" }}
              />
            </ListItem>
          </div>
        </>
      )}
    </div>
  );
}
