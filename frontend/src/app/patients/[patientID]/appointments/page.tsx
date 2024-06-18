import { AddCircleOutline } from "@mui/icons-material";
import { Divider, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import { useFetchPatientAppointments } from "./actions";

const AppointmentsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const { appointments, error } = await useFetchPatientAppointments(patientID);
  console.log(appointments);
  return (
    <List className="flex bg-[#DCD6D6] flex-col w-[90%] md:w-2/3">
      <pre>Here {error}</pre>
      <Typography
        variant="h6"
        gutterBottom
        className="flex flex-col md:flex-row justify-center"
      >
        Appointments
        <Link href={`/patients/${patientID}/create-appointment`}>
          <AddCircleOutline /> Book appointment
        </Link>
      </Typography>
      {error && !appointments && <div>Error loaind the appoitnments</div>}
      {appointments && appointments.length === 0 && (
        <div>There are no appointments</div>
      )}
      {appointments && appointments.length > 0 && !error && (
        <>
          {appointments.map((appointment, index) => (
            <>
              <Link
                href={`/patients/${appointment.patientID}/appointments/${appointment.id}`}
                key={appointment.id}
                className="w-full h-full"
              >
                <ListItem className="flex w-full justify-between hover:bg-[#C1BABA]">
                  <div className="w-[10%]">{appointment.id}</div>
                  <div className="w-[70%]">
                    {appointment.patient.firstName +
                      " " +
                      appointment.patient.lastName}
                  </div>
                  <div className="w-[20%]">{appointment.venue}</div>
                </ListItem>
              </Link>
              {index !== appointments.length - 1 && (
                <Divider variant="middle" component="li" key={appointment.id} />
              )}
            </>
          ))}
        </>
      )}
    </List>
  );
};

export default AppointmentsPage;
