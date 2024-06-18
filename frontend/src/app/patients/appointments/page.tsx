import { useFetchAllAppointments } from "@/hooks/appointmentHooks";
import { Divider, List, ListItem, Paper } from "@mui/material";
import Link from "next/link";

const Appointments = async () => {
  const { loading, appointments, error } = await useFetchAllAppointments();
  return (
    <List className="flex bg-[#DCD6D6] flex-col w-[90%] md:w-2/3">
      {appointments && (
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

export default Appointments;
