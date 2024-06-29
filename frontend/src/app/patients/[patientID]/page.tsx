import axios from "axios";
import { cookies } from "next/headers";
import PersonIcon from "@mui/icons-material/Person";
import LocationCity from "@mui/icons-material/LocationCity";
import { ContactPhone, Phone } from "@mui/icons-material";
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

const fetchPatient = async ({
  cookieHeader,
  patientID,
}: {
  cookieHeader: string;
  patientID: string;
}) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/provider/patients/${patientID}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader, // Pass cookies from the request
        },
        withCredentials: true, // Automatically sends cookies
      }
    );

    if (response.status === (200 || 201)) {
      return response.data.patient;
    } else {
      console.log("Failed to fetch patient details");
      return [];
    }
  } catch (error) {
    console.error("Error fetching patient details:", error);
    return [];
  }
};

export default async function Patient({
  params,
}: {
  params: { patientID: string };
}) {
  const { patientID } = params;
  const tokenCookie = cookies().get("token");
  const cookieHeader = tokenCookie ? `token=${tokenCookie.value}` : "";
  const patient: Patient = await fetchPatient({ patientID, cookieHeader });

  const age =
    new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  console.log(patient);
  return (
    <div>
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
    </div>
  );
}
