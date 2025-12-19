import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Autocomplete,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { type ComponentType } from "react";
import LeadScoreTimeline from "./LeadScoreTimeline";
import type { timelineTypes } from "../lib/utils";
import ErrorAlert from "./Alert/ErrorAlert";
interface LeadScoreTimelineDialogProps {
  DialogInitiator: ComponentType<{
    onClick: () => void;
  }>;
  TimelineDialog?: ComponentType<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
    leadScoreDetails: Array<{
      date: string;
      score: number;
      message: string;
    }>;
  }>;
  CustomTimeline?: React.ComponentType<{
    timelineDetails: Array<{
      date: string;
      score: number;
      message: string;
    }>;
    isLoading?: boolean;
  }>;
  studentId: string;
  apiKey: string;
  dialogTitle?: string;
}

function LeadScoreTimelineDialog({
  DialogInitiator,
  TimelineDialog,
  apiKey,
  studentId,
  CustomTimeline,
  dialogTitle,
}: LeadScoreTimelineDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [timelineType, setTimelineType] =
    React.useState<timelineTypes>("timeline");

  const [data, setData] = React.useState<
    | []
    | Array<{
        date: string;
        score: number;
        message: string;
      }>
  >([]);

  React.useEffect(() => {
    if (open && TimelineDialog) {
      // Dummy promise that returns lead score details after 1 second
      const fetchLeadScoreDetails = async () => {
        return new Promise<
          Array<{ date: string; score: number; message: string }>
        >((resolve) => {
          setTimeout(() => {
            resolve([
              {
                date: "2024-01-01",
                score: Math.floor(Math.random() * 101),
                message: "Lead score improved due to recent activity.",
              },
              {
                date: "2024-02-01",
                score: Math.floor(Math.random() * 101),
                message: "Lead score improved due payment received.",
              },
            ]);
          }, 1000);
        });
      };
      setLoading(true);
      fetchLeadScoreDetails().then((details) => {
        setLoading(false);
        setData(details);
      });
    }
  }, [open, TimelineDialog]);

  if (apiKey !== "https://www.demoapi.com") {
    return <ErrorAlert apiKey={apiKey} />;
  }

  return (
    <>
      <DialogInitiator onClick={() => setOpen(true)} />
      {open && (
        <>
          {TimelineDialog ? (
            <TimelineDialog
              isLoading={loading}
              open={open}
              setOpen={setOpen}
              leadScoreDetails={data}
            />
          ) : (
            <Dialog
              maxWidth="md"
              fullWidth
              PaperProps={{ sx: { borderRadius: 2.5 } }}
              open={open}
              onClose={() => setOpen(false)}
            >
              <DialogTitle>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {dialogTitle || "Lead Score Timeline"}
                  <IconButton
                    onClick={() => setOpen(false)}
                    data-testid="close-icon"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                {!CustomTimeline && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Autocomplete
                      size="small"
                      sx={{ width: 200, mb: 2 }}
                      options={["table", "card", "timeline"]}
                      value={timelineType}
                      onChange={(_, newValue) => {
                        setTimelineType(newValue as timelineTypes);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Timeline Type"
                          variant="outlined"
                          color="info"
                        />
                      )}
                    />
                  </Box>
                )}
                <LeadScoreTimeline
                  apiKey={apiKey}
                  studentId={studentId}
                  timelineType={timelineType}
                  timelinePosition={"alternate"}
                  CustomTimeline={CustomTimeline}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => setOpen(false)}
                  sx={{ borderRadius: 5 }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </>
  );
}

export default LeadScoreTimelineDialog;
