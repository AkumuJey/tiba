import { AppointmentDetails, fetchAppointment } from "@/lib/appointmentUtils";
import { getCookies } from "@/lib/getCookies";
import { Box, Typography } from "@mui/material";
import AppointmentBottomDiv from "./AppointmentBottomDiv";

const SingleAppointment = async ({
  params,
}: {
  params: { appointmentID: string; patientID: string };
}) => {
  const { patientID, appointmentID } = params;
  const cookieHeader = getCookies();
  const appointment: AppointmentDetails = await fetchAppointment({
    appointmentID,
    patientID,
    cookieHeader,
  });
  const { patient } = appointment;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="div" className="mb-4 text-left">
        Appointment Details
      </Typography>
      {!appointment ? (
        <div>
          <Typography className="font-bold">
            Error finding appointment
          </Typography>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Appointment Time:
            </Typography>
            <Typography variant="body2">
              Date: {new Date(appointment.appointmentTime).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Time: {new Date(appointment.appointmentTime).toLocaleTimeString()}
            </Typography>
          </div>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Venue:
            </Typography>
            <Typography variant="body2">{appointment.venue}</Typography>
          </div>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Reason for visit:
            </Typography>
            <Typography variant="body2">{appointment.description}</Typography>
          </div>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Patient Name:
            </Typography>
            <Typography variant="body2">
              {`${patient.firstName} ${patient.lastName}`}
            </Typography>
          </div>
          <div className="mb-4">
            <Typography
              variant="subtitle1"
              component="div"
              className="font-bold"
            >
              Created at:
            </Typography>
            <Typography variant="body2">
              Date: {new Date(appointment.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Time: {new Date(appointment.createdAt).toLocaleTimeString()}
            </Typography>
          </div>
          <AppointmentBottomDiv
            appointmentID={appointmentID}
            patientID={appointmentID}
          />
        </>
      )}
    </Box>
  );
};

export default SingleAppointment;
