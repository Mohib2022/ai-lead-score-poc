import TimelineCardSkeleton from "./TimelineCardSkeleton";
import TimelineSkeleton from "./TimelineSkeleton";
import TimelineTableSkeleton from "./TimelineTableSkeleton";
interface ScoreSkeletonProps {
  timelineType: "table" | "card" | "timeline" | undefined;
  timelinePosition?: "left" | "right" | "alternate" | "alternate-reverse";
  classes?: {
    timeline: string;
    card: string;
    table: string;
  };
}
function ScoreSkeleton({
  timelineType,
  timelinePosition,
  classes,
}: ScoreSkeletonProps) {
  switch (timelineType) {
    case "timeline":
      return (
        <TimelineSkeleton
          className={classes?.timeline}
          timelinePosition={timelinePosition}
        />
      );
    case "card":
      return <TimelineCardSkeleton className={classes?.card} />;
    case "table":
      return <TimelineTableSkeleton className={classes?.table} />;
    default:
      return null;
  }
}

export default ScoreSkeleton;
