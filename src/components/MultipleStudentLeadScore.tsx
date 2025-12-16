import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import ScoreChip from "./TimelineView/ScoreChip";
import TimelineTableSkeleton from "./Skeleton/TimelineTableSkeleton";
import LeadScoreTimelineDialog from "./LeadScoreTimelineDialog";
import ErrorAlert from "./Alert/ErrorAlert";

interface MultipleStudentLeadScoreProps {
  studentIds: string[];
  apiKey: string;
  loader?: React.ReactElement;
  className?: string;
  CustomComponent?: React.ComponentType<{
    scores: Array<{
      studentId: string;
      name: string;
      leadScore: number | null;
      email: string;
      phone: number;
    }>;
  }>;
}

function MultipleStudentLeadScore({
  studentIds,
  apiKey,
  loader,
  CustomComponent,
  className,
}: MultipleStudentLeadScoreProps) {
  const [leadScores, setLeadScores] = React.useState<
    Array<{
      studentId: string;
      leadScore: number;
      name: string;
      email: string;
      phone: number;
    }>
  >([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    // Dummy promise that returns lead scores for multiple students after 1 second
    const fetchLeadScores = async () => {
      return new Promise<
        Array<{
          studentId: string;
          leadScore: number;
          name: string;
          email: string;
          phone: number;
        }>
      >((resolve) => {
        setTimeout(() => {
          const scores = studentIds.map((id, index) => ({
            studentId: id,
            leadScore: Math.floor(Math.random() * 101), // Random score between 0 and 100
            name: `Student ${index}`,
            email: `example${index}@gmail.com`,
            phone: 233453 + index,
          }));
          resolve(scores);
        }, 1000);
      });
    };
    setLoading(true);
    fetchLeadScores().then((scores) => {
      setLoading(false);
      setLeadScores(scores);
    });
  }, [studentIds, apiKey]);

  if (apiKey !== "https://www.demoapi.com") {
    return <ErrorAlert apiKey={apiKey} />;
  }

  if (loading) {
    return loader ? loader : <TimelineTableSkeleton className={className} />;
  }
  return (
    <div>
      {CustomComponent ? (
        <CustomComponent scores={leadScores} />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
          className={className}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>AI Lead Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leadScores.map((details) => (
                <TableRow hover key={details.studentId}>
                  <TableCell>
                    <LeadScoreTimelineDialog
                      DialogInitiator={({ onClick }) => (
                        <span
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={onClick}
                        >
                          {details.name}
                        </span>
                      )}
                      apiKey={"https://www.demoapi.com"}
                      studentId={details.studentId}
                    />
                  </TableCell>
                  <TableCell>{details.email}</TableCell>
                  <TableCell>{details.phone}</TableCell>
                  <TableCell>
                    <ScoreChip score={details.leadScore} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default MultipleStudentLeadScore;
