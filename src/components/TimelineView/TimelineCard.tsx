import { Card, CardContent } from "@mui/material";
import ScoreChip from "./ScoreChip";

interface TimelineCardProps {
  details: {
    date: string;
    score: number;
    message: string;
  };
  className?: string | undefined;
}
function TimelineCard({ details, className }: TimelineCardProps) {
  return (
    <Card
      sx={{
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
        textAlign: "left",
      }}
      className={className}
    >
      <CardContent>
        <div>
          <strong>Date:</strong> {details.date}
        </div>
        <div>
          <strong>Score:</strong> <ScoreChip score={details.score} />
        </div>
        <div>
          <strong>Message:</strong> {details.message}
        </div>
      </CardContent>
    </Card>
  );
}

export default TimelineCard;
