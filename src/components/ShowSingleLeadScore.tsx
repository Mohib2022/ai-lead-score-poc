import { Skeleton } from "@mui/material";
import React, { type ComponentType } from "react";
import ScoreChip from "./TimelineView/ScoreChip";
import ErrorAlert from "./Alert/ErrorAlert";

interface ShowSingleLeadScoreProps {
  apiKey: string;
  studentId: string;
  CustomComponent?: ComponentType<{
    isLoading: boolean;
    score: number;
  }>;
}

function ShowSingleLeadScore({
  apiKey,
  studentId,
  CustomComponent,
}: ShowSingleLeadScoreProps) {
  const [leadScore, setLeadScore] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    // Dummy promise that returns a random lead score after 1 second
    const fetchLeadScore = async () => {
      return new Promise<number>((resolve) => {
        setTimeout(() => {
          const randomScore = Math.floor(Math.random() * 101); // Random score between 0 and 100
          resolve(randomScore);
        }, 1000);
      });
    };
    setLoading(true);
    fetchLeadScore().then((score) => {
      setLoading(false);
      setLeadScore(score);
    });
  }, [apiKey, studentId]);

  if (apiKey !== "https://www.demoapi.com") {
    return <ErrorAlert apiKey={apiKey} />;
  }

  return (
    <>
      {CustomComponent ? (
        <CustomComponent isLoading={loading} score={leadScore} />
      ) : (
        <>
          {loading ? (
            <Skeleton variant="circular" width={25} height={25} />
          ) : (
            <ScoreChip score={leadScore} />
          )}
        </>
      )}
    </>
  );
}

export default ShowSingleLeadScore;
