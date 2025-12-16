import { Chip } from "@mui/material";

interface ScoreChipProps {
  score: number;
}
function ScoreChip({ score }: ScoreChipProps) {
  const color = score > 70 ? "success" : score > 40 ? "warning" : "error";
  return <Chip size="small" label={score} color={color} />;
}

export default ScoreChip;
