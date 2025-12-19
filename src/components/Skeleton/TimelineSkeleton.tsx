import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";

import SkeletonCard from "./SkeletonCard";
interface TimelineSkeletonProps {
  timelinePosition?: "left" | "right" | "alternate" | "alternate-reverse";
  className?: string;
}
function TimelineSkeleton({
  timelinePosition,
  className,
}: TimelineSkeletonProps) {
  return (
    <Timeline data-testid="timeline-skeleton" position={timelinePosition}>
      {Array.from({ length: 2 }).map((_, i) => (
        <TimelineItem key={i}>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <SkeletonCard className={className} />
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

export default TimelineSkeleton;
