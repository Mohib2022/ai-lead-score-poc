import { Stack } from "@mui/material";
import SkeletonCard from "./SkeletonCard";
interface TimelineCardSkeletonProps {
  className?: string;
}
function TimelineCardSkeleton({ className }: TimelineCardSkeletonProps) {
  return (
    <Stack
      data-testid="card-skeleton"
      className={className}
      sx={{ gap: "1.5rem" }}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </Stack>
  );
}

export default TimelineCardSkeleton;
