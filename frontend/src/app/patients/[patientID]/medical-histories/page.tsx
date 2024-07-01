"use server";
import { getCookies } from "@/lib/getCookies";
import {
  fetchHistories,
  formatDateTime,
  MedicalHistory,
} from "@/lib/medicalHistory";
import { AddCircleOutline } from "@mui/icons-material";
import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

const MedicalHistoriesPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const cookieHeader = getCookies();
  const histories: MedicalHistory[] = await fetchHistories({
    patientID,
    cookieHeader,
  });
  return (
    <Grid item xs={12} md={6}>
      <div className="flex justify-between py-1">
        <h4 className="text-2xl font-bold">Medical histories</h4>
        <Link
          href={`/patients/${patientID}/create-medical-histories`}
          className="px-[1rem] py-[0.7rem] bg-[#E2D2D2] rounded-md text-lg flex gap-2 flex-col md:flex-row"
        >
          <AddCircleOutline className="font-bold" height={5} width={5} /> Enter
          <h4>Add Medical History</h4>
        </Link>
      </div>
      <List>
        {!histories ? (
          <div>Error loading medical histories</div>
        ) : (
          <>
            histories.length === 0 ? (<div>No medical histories available</div>)
            : (
            <>
              {histories.map((history) => (
                <>
                  <Link
                    href={`/patients/${patientID}/medical-histories/${history.id}`}
                    key={history.id}
                  >
                    <ListItem>
                      <ListItemText
                        primary={`Date: ${
                          formatDateTime(history.createdAt).formattedDate
                        } Time: ${
                          formatDateTime(history.createdAt).formattedTime
                        }`}
                        secondary={`Presentation: ${history.presentation}`}
                      />
                    </ListItem>
                    <Divider variant="middle" component="li" />
                  </Link>
                </>
              ))}
            </>
            )
          </>
        )}
      </List>
    </Grid>
  );
};

export default MedicalHistoriesPage;
