import PatientsList from "@/components/PatientsList";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import { Grid } from "@mui/material";

const Patients = async () => {
  return (
    <Grid className="w-[90%] md:w-2/3 mx-auto">
      <PatientsList />
    </Grid>
  );
};

const ProtectedPatients = () => (
  <ProtectedRoutes>
    <Patients />
  </ProtectedRoutes>
);

export default ProtectedPatients;
