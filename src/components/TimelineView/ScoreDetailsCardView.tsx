import { Stack } from "@mui/material";
import TimelineCard from "./TimelineCard";

interface ScoreDetailsCardViewProps {
  timelineDetails: Array<{
    date: string;
    score: number;
    message: string;
  }>;
  className?: string | undefined;
}
const ScoreDetailsCardView = ({
  timelineDetails,
  className,
}: ScoreDetailsCardViewProps) => {
  return (
    <Stack className={className} sx={{ gap: "1.5rem" }}>
      {timelineDetails.map((details, index) => (
        <TimelineCard key={index} details={details} />
      ))}
    </Stack>
  );
};

export default ScoreDetailsCardView;
