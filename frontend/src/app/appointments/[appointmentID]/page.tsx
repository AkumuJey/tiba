import React from "react";

const SingleAppointment = ({
  params,
}: {
  params: { appointmentID: string };
}) => {
  const appointmentID = params.appointmentID;
  return (
    <div>
      <p>Here are my appointments: </p>
      {appointmentID}
    </div>
  );
};

export default SingleAppointment;
