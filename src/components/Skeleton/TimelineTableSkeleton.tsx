import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
interface TimelineTableSkeletonProps {
  className?: string;
}
function TimelineTableSkeleton({ className }: TimelineTableSkeletonProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
      className={className}
      data-testid="table-skeleton"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="25%">
              <Skeleton variant="rounded" height={35} />
            </TableCell>
            <TableCell width="25%">
              <Skeleton variant="rounded" height={35} />
            </TableCell>
            <TableCell width="50%">
              <Skeleton variant="rounded" height={35} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell width="25%">
                <Skeleton variant="rounded" height={25} />
              </TableCell>
              <TableCell width="25%">
                <Skeleton variant="rounded" height={25} />
              </TableCell>
              <TableCell width="50%">
                <Skeleton variant="rounded" height={25} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* Table Header */}
      </Table>
    </TableContainer>
  );
}

export default TimelineTableSkeleton;
