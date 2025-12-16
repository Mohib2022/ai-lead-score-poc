import { Card, CardContent, Skeleton, Stack } from "@mui/material";
interface SkeletonCardProps {
  className?: string | undefined;
}
function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <Card
      sx={{
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
      className={className}
    >
      <CardContent>
        <Stack spacing={1}>
          <Skeleton variant="rounded" width="60%" height={20} />
          <Skeleton variant="rounded" width="40%" height={16} />
          <Skeleton variant="rounded" width="80%" height={16} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default SkeletonCard;
