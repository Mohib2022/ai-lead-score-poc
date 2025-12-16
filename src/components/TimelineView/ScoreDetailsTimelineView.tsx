import type { timelinePositions } from "../../lib/utils";
import { Timeline, TimelineConnector } from "@mui/lab";
import { TimelineItem } from "@mui/lab";
import { TimelineSeparator } from "@mui/lab";
import { TimelineDot } from "@mui/lab";
import { TimelineContent } from "@mui/lab";
import TimelineCard from "./TimelineCard";

interface ScoreDetailsTimelineViewProps {
  timelinePosition?: timelinePositions;
  timelineDetails: Array<{
    date: string;
    score: number;
    message: string;
  }>;
  className?: string | undefined;
}
function ScoreDetailsTimelineView({
  timelineDetails,
  timelinePosition,
  className,
}: ScoreDetailsTimelineViewProps) {
  return (
    <Timeline position={timelinePosition}>
      {timelineDetails.map((details, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <TimelineCard className={className} details={details} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default ScoreDetailsTimelineView;
