"use server";
import { getCookies } from "@/lib/getCookies";
import { formatDateTime } from "@/lib/medicalHistory";
import { fetchPrescriptions, Prescription } from "@/lib/prescription";
import { AddCircleOutline } from "@mui/icons-material";
import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

const PrescriptionsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const cookieHeader = getCookies();
  const prescriptions: Prescription[] = await fetchPrescriptions({
    patientID,
    cookieHeader,
  });
  return (
    <Grid item xs={12} md={6}>
      <div className="flex justify-between py-1">
        <h4 className="text-2xl font-bold">Prescriptions</h4>
        <Link
          href={`/patients/${patientID}/create-prescription`}
          className="px-[1rem] py-[0.7rem] bg-[#E2D2D2] rounded-md text-lg flex gap-2 flex-col md:flex-row"
        >
          <AddCircleOutline className="font-bold" height={5} width={5} /> Enter
          <h4>Enter new prescription</h4>
        </Link>
      </div>
      <List>
        {prescriptions &&
          prescriptions.map((prescription) => (
            <Link
              href={`/patients/${patientID}/prescriptions/${prescription.id}`}
              key={prescription.id}
            >
              <ListItem>
                <ListItemText
                  primary={`Date: ${
                    formatDateTime(prescription.createdAt).formattedDate
                  } Time: ${
                    formatDateTime(prescription.createdAt).formattedTime
                  }`}
                  secondary={`Instructions ${prescription.instruction}`}
                />
              </ListItem>
              <Divider variant="middle" component="li" />
            </Link>
          ))}
      </List>
    </Grid>
  );
};

export default PrescriptionsPage;
