import { getCookies } from "@/lib/getCookies";
import { fetchVitalsList, formatVitalsDateTime, Vitals } from "@/lib/vitals";
import { AddCircleOutline } from "@mui/icons-material";
import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

const VitalsPage = async ({ params }: { params: { patientID: string } }) => {
  const { patientID } = params;
  const cookieHeader = getCookies();
  const hospitalVitalsList: Vitals[] = await fetchVitalsList({
    patientID,
    cookieHeader,
  });

  return (
    <Grid item xs={12} md={6}>
      <>
        {!hospitalVitalsList ? (
          <div>Error loading vitals</div>
        ) : (
          <>
            <div className="flex justify-between py-1">
              <h4 className="text-2xl font-bold">Vitals reading</h4>
              <Link
                href={`/patients/${patientID}/create-vitals`}
                className="px-[1rem] py-[0.7rem] bg-[#E2D2D2] rounded-md text-lg flex gap-2 flex-col md:flex-row"
              >
                <AddCircleOutline className="font-bold" height={5} width={5} />{" "}
                <h4>New vitals</h4>
              </Link>
            </div>
            <List>
              {hospitalVitalsList.length === 0 ? (
                <div>No vitals available</div>
              ) : (
                <>
                  {hospitalVitalsList.map((vitals) => (
                    <>
                      <Link
                        href={`/patients/${patientID}/vitals/${vitals.id}`}
                        key={vitals.id}
                      >
                        <ListItem>
                          <ListItemText
                            primary={`Date: ${
                              formatVitalsDateTime(vitals.createdAt)
                                .formattedDate
                            } Time: ${
                              formatVitalsDateTime(vitals.createdAt)
                                .formattedTime
                            }`}
                            secondary={`Display Vitals`}
                          />
                        </ListItem>
                        <Divider variant="middle" component="li" />
                      </Link>
                    </>
                  ))}
                </>
              )}
            </List>
          </>
        )}
      </>
    </Grid>
  );
};

export default VitalsPage;
