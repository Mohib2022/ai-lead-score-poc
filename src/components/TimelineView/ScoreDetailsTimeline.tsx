import type { timelinePositions } from "../../lib/utils";
import ScoreDetailsCardView from "./ScoreDetailsCardView";
import ScoreDetailsTableView from "./ScoreDetailsTableView";
import ScoreDetailsTimelineView from "./ScoreDetailsTimelineView";
interface LeadScoreTimelineProps {
  timelinePosition?: timelinePositions;
  timelineType?: "table" | "card" | "timeline";
  timelineDetails: Array<{
    date: string;
    score: number;
    message: string;
  }>;
  classes?: {
    timeline: string;
    card: string;
    table: string;
  };
}
function ScoreDetailsTimeline({
  timelinePosition = "alternate",
  timelineDetails,
  timelineType,
  classes,
}: LeadScoreTimelineProps) {
  switch (timelineType) {
    case "table":
      return (
        <ScoreDetailsTableView
          className={classes?.table}
          timelineDetails={timelineDetails}
        />
      );
    case "card":
      return (
        <ScoreDetailsCardView
          className={classes?.card}
          timelineDetails={timelineDetails}
        />
      );
    case "timeline":
      return (
        <ScoreDetailsTimelineView
          className={classes?.timeline}
          timelineDetails={timelineDetails}
          timelinePosition={timelinePosition}
        />
      );
    default:
      return null;
  }
}

export default ScoreDetailsTimeline;
