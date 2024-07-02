"use server";
import { getCookies } from "@/lib/getCookies";
import { fetchLabResultsList, Labresults } from "@/lib/labs";
import { AddCircleOutline } from "@mui/icons-material";
import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";

const formatDateTime = (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return { formattedDate, formattedTime };
};
const LabResultsPage = async ({
  params,
}: {
  params: { patientID: string };
}) => {
  const { patientID } = params;
  const cookieHeader = getCookies();
  const hospitalLabsResultsList: Labresults[] = await fetchLabResultsList({
    patientID,
    cookieHeader,
  });
  return (
    <Grid item xs={12} md={6}>
      <div className="flex justify-between py-1">
        <h4 className="text-2xl font-bold">Laboratory Results</h4>
        <Link
          href={`/patients/${patientID}/create-labs`}
          className="px-[1rem] py-[0.7rem] bg-[#E2D2D2] rounded-md text-lg flex gap-2 flex-col md:flex-row"
        >
          <AddCircleOutline className="font-bold" height={5} width={5} />
          <h6>Add lab results</h6>
        </Link>
      </div>
      <List>
        <>
          {!hospitalLabsResultsList ? (
            <div>Error fetching labresults</div>
          ) : (
            <>
              <>
                {hospitalLabsResultsList.length === 0 ? (
                  <div>No lab results available</div>
                ) : (
                  hospitalLabsResultsList.map((labresults) => (
                    <>
                      <Link
                        href={`/patients/${patientID}/labs/${labresults.id}`}
                        key={labresults.id}
                      >
                        <ListItem>
                          <ListItemText
                            primary={`Date: ${
                              formatDateTime(labresults.createdAt).formattedDate
                            } Time: ${
                              formatDateTime(labresults.createdAt).formattedTime
                            }`}
                            secondary={`Findings: ${labresults.findings} Labname: ${labresults.labName}`}
                          />
                        </ListItem>
                        <Divider variant="middle" component="li" />
                      </Link>
                    </>
                  ))
                )}
              </>
            </>
          )}
        </>
      </List>
    </Grid>
  );
};

export default LabResultsPage;
