import React from "react";
import ScoreDetailsTimeline from "./TimelineView/ScoreDetailsTimeline";
import type { timelinePositions, timelineTypes } from "../lib/utils";
import ScoreSkeleton from "./Skeleton/ScoreSkeleton";
import ErrorAlert from "./Alert/ErrorAlert";

interface LeadScoreTimelineProps {
  timelineType?: timelineTypes;
  apiKey: string;
  studentId: string;
  timelinePosition?: timelinePositions;
  CustomTimeline?: React.ComponentType<{
    timelineDetails: Array<{
      date: string;
      score: number;
      message: string;
    }>;
    isLoading?: boolean;
  }>;
  classes?: {
    timeline: string;
    card: string;
    table: string;
  };
}

function LeadScoreTimeline({
  timelineType = "timeline",
  apiKey,
  studentId,
  timelinePosition = "alternate",
  CustomTimeline,
  classes,
}: LeadScoreTimelineProps) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<
    Array<{
      date: string;
      score: number;
      message: string;
    }>
  >([]);

  React.useEffect(() => {
    // Dummy promise that returns lead score timeline data after 1 second
    const fetchLeadScoreTimeline = async () => {
      return new Promise<
        Array<{ date: string; score: number; message: string }>
      >((resolve) => {
        setTimeout(() => {
          resolve([
            {
              date: "2024-01-01",
              score: Math.floor(Math.random() * 100),
              message: "Lead score improved due to recent activity.",
            },
            {
              date: "2024-02-01",
              score: Math.floor(Math.random() * 100),
              message: "Lead score improved due payment received.",
            },
          ]);
        }, 1000);
      });
    };
    setLoading(true);
    fetchLeadScoreTimeline().then((timelineData) => {
      setLoading(false);
      setData(timelineData);
    });
  }, [apiKey, studentId, timelineType]);

  if (apiKey !== "https://www.demoapi.com") {
    return <ErrorAlert apiKey={apiKey} />;
  }
  if (CustomTimeline) {
    return <CustomTimeline timelineDetails={data} isLoading={loading} />;
  }
  return (
    <div>
      {loading ? (
        <ScoreSkeleton
          timelineType={timelineType}
          timelinePosition={timelinePosition}
          classes={classes}
        />
      ) : (
        <div>
          <ScoreDetailsTimeline
            timelineDetails={data}
            timelinePosition={timelinePosition}
            timelineType={timelineType}
            classes={classes}
          />
        </div>
      )}
    </div>
  );
}

export default LeadScoreTimeline;
