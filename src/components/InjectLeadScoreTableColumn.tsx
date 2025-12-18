import { useEffect, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import ShowSingleLeadScore from "./ShowSingleLeadScore";
import ErrorAlert from "./Alert/ErrorAlert";
import { returnMaxUsedClass } from "./HelperFunctions/HelperFunctions";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

interface InjectLeadScoreTableColumnProps {
  tableId: string;
  studentIds: string[];
  headerInjectionIndex?: number;
  headerName: string;
  apiKey: string;
  CustomComponent?: ComponentType<{
    isLoading: boolean;
    score: number;
  }>;
}

const HEADER_MARKER_CLASS = "lead-score-header";
const CELL_MARKER_CLASS = "lead-score-cell";

function InjectLeadScoreTableColumn({
  tableId,
  CustomComponent,
  studentIds,
  headerInjectionIndex,
  headerName,
  apiKey,
}: InjectLeadScoreTableColumnProps) {
  const theme = useTheme();
  useEffect(() => {
    const table = document.getElementById(tableId) as HTMLTableElement | null;
    if (!table) return;

    const headerRow = table.querySelector("thead tr");
    const bodyRows = table.querySelectorAll("tbody tr");

    if (!headerRow || bodyRows.length === 0) return;

    const existingTh = headerRow.querySelectorAll("th");

    const commonThClass = returnMaxUsedClass(existingTh);

    const firstBodyRow = bodyRows[0];
    const existingTd = firstBodyRow.querySelectorAll("td");
    const commonTdClass = returnMaxUsedClass(existingTd);

    /* ---------------- HEADER ---------------- */

    if (!headerRow.querySelector(`.${HEADER_MARKER_CLASS}`)) {
      const th = document.createElement("th");
      th.className = `${commonThClass} ${HEADER_MARKER_CLASS}`.trim();

      th.textContent = headerName;

      const index =
        headerInjectionIndex !== undefined
          ? Math.min(headerInjectionIndex, headerRow.children.length)
          : headerRow.children.length;

      headerRow.insertBefore(th, headerRow.children[index] ?? null);
    }

    /* ---------------- BODY ---------------- */

    bodyRows.forEach((row, rowIndex) => {
      if (row.querySelector(`.${CELL_MARKER_CLASS}`)) return;

      const td = document.createElement("td");

      td.className = `${commonTdClass} ${CELL_MARKER_CLASS}`.trim();

      const index =
        headerInjectionIndex !== undefined
          ? Math.min(headerInjectionIndex, row.children.length)
          : row.children.length;

      row.insertBefore(td, row.children[index] ?? null);

      const cellRoot = createRoot(td);
      cellRoot.render(
        <ThemeProvider theme={theme}>
          <ShowSingleLeadScore
            CustomComponent={CustomComponent}
            apiKey={apiKey}
            studentId={studentIds[rowIndex]}
          />
        </ThemeProvider>
      );
    });
  }, [
    tableId,
    studentIds,
    headerInjectionIndex,
    headerName,
    CustomComponent,
    apiKey,
    theme,
  ]);
  if (apiKey !== "https://www.demoapi.com") {
    return <ErrorAlert apiKey={apiKey} />;
  }
  return null;
}

export default InjectLeadScoreTableColumn;
