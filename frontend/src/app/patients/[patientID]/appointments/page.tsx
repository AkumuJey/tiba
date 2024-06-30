import AppointmentsDisplay from "@/components/Appointments";
import { AddCircleOutline } from "@mui/icons-material";
import { Grid } from "@mui/material";
import Link from "next/link";

const AppointmentsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  return (
    <Grid item xs={12} md={6}>
      <div className="flex justify-between py-1">
        <h4 className="text-2xl font-bold"> Appointments</h4>
        <Link
          href={`/patients/${patientID}/create-appointment`}
          className="px-[1rem] py-[0.7rem] bg-[#E2D2D2] rounded-md text-lg flex gap-2 flex-col md:flex-row"
        >
          <AddCircleOutline className="font-bold" height={5} width={5} /> Enter
          <h4>Book appointment</h4>
        </Link>
      </div>
      <div className="w-full">
        <AppointmentsDisplay patientID={Number(patientID)} />
      </div>
    </Grid>
  );
};

export default AppointmentsPage;
