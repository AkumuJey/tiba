"use server";
import AppointmentsDisplay from "@/components/Appointments";
import { Grid, Paper } from "@mui/material";

const Appointments = async ({
  searchParams,
}: {
  searchParams?: { q?: string };
}) => {
  return (
    <Grid className="w-[95%] md:w-3/4 mx-auto">
      <Paper
        elevation={2}
        className="w-[95%] md:w-3/4 mx-auto mt-[1rem] bg-transparent p-4"
      >
        <AppointmentsDisplay searchParams={searchParams} />
      </Paper>
    </Grid>
  );
};

export default Appointments;
