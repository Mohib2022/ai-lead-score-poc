import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ScoreChip from "./ScoreChip";

interface ScoreDetailsTableViewProps {
  timelineDetails: Array<{
    date: string;
    score: number;
    message: string;
  }>;
  className?: string | undefined;
}
function ScoreDetailsTableView({
  timelineDetails,
  className,
}: ScoreDetailsTableViewProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "10px",
      }}
      className={className}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }} width="25%">
              Score Update Date
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} width="25%">
              Score
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} width="50%">
              Message
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timelineDetails.map((details, i) => (
            <TableRow
              hover
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={i}
            >
              <TableCell width="25%">{details.date}</TableCell>
              <TableCell width="25%">
                <ScoreChip score={details.score} />
              </TableCell>
              <TableCell width="50%">{details.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* Table Header */}
      </Table>
    </TableContainer>
  );
}

export default ScoreDetailsTableView;
