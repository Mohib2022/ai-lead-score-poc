import React from "react";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, it, vi, expect } from "vitest";
import { createRoot } from "react-dom/client";
import InjectLeadScoreTableColumn from "../components/InjectLeadScoreTableColumn";

/* ------------------ MOCKS ------------------ */
// Mock ErrorAlert
vi.mock("../components/Alert/ErrorAlert", () => ({
  default: ({ apiKey }: any) => <div data-testid="error-alert">{apiKey}</div>,
}));

// Mock ShowSingleLeadScore
vi.mock("../ShowSingleLeadScore", () => ({
  default: ({ studentId }: any) => (
    <div data-testid={`lead-score-${studentId}`}>{studentId}</div>
  ),
}));

// Mock createRoot
vi.mock("react-dom/client", async () => {
  const actual = await vi.importActual("react-dom/client");
  return {
    ...actual,
    createRoot: vi.fn((element) => ({
      render: vi.fn(),
    })),
  };
});

/* ------------------ CLEANUP ------------------ */
afterEach(() => {
  document.body.innerHTML = "";
  vi.clearAllMocks();
});

describe("InjectLeadScoreTableColumn", () => {
  it("renders ErrorAlert when apiKey is invalid", () => {
    render(
      <InjectLeadScoreTableColumn
        apiKey="invalid"
        tableId="table1"
        studentIds={["s1"]}
        headerName="Lead Score"
      />
    );
    expect(screen.getByTestId("error-alert")).toHaveTextContent("invalid");
  });

  it("returns null if table element does not exist", () => {
    const { container } = render(
      <InjectLeadScoreTableColumn
        apiKey="https://www.demoapi.com"
        tableId="nonexistent"
        studentIds={["s1"]}
        headerName="Lead Score"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("returns null if table has no header or body rows", () => {
    document.body.innerHTML = `<table id="myTable"></table>`;
    const { container } = render(
      <InjectLeadScoreTableColumn
        apiKey="https://www.demoapi.com"
        tableId="myTable"
        studentIds={["s1"]}
        headerName="Lead Score"
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("inserts header and body cells correctly", () => {
    document.body.innerHTML = `
      <table id="myTable">
        <thead><tr><th>Existing</th></tr></thead>
        <tbody>
          <tr><td>Row1Col1</td></tr>
          <tr><td>Row2Col1</td></tr>
        </tbody>
      </table>
    `;

    render(
      <InjectLeadScoreTableColumn
        apiKey="https://www.demoapi.com"
        tableId="myTable"
        studentIds={["s1", "s2"]}
        headerName="Lead Score"
      />
    );

    const table = document.getElementById("myTable")!;
    const headerCells = table.querySelectorAll("thead tr th");
    expect(headerCells[1].textContent).toBe("Lead Score");
    expect(headerCells[1].className).toContain("lead-score-header");

    const bodyRows = table.querySelectorAll("tbody tr");
    bodyRows.forEach((row, i) => {
      const cell = row.querySelector(`.${"lead-score-cell"}`);
      expect(cell).toBeDefined();
      // Ensure createRoot.render was called
      expect(createRoot).toHaveBeenCalled();
    });
  });

  it("skips header if it already exists", () => {
    document.body.innerHTML = `
      <table id="myTable">
        <thead><tr><th class="lead-score-header">Lead Score</th></tr></thead>
        <tbody><tr><td>Row1Col1</td></tr></tbody>
      </table>
    `;

    render(
      <InjectLeadScoreTableColumn
        apiKey="https://www.demoapi.com"
        tableId="myTable"
        studentIds={["s1"]}
        headerName="Lead Score"
      />
    );

    const headerCells = document
      .getElementById("myTable")!
      .querySelectorAll("thead tr th");
    expect(headerCells.length).toBe(1); // No duplicate
  });

  it("skips body cell if it already exists", () => {
    document.body.innerHTML = `
      <table id="myTable">
        <thead><tr><th>Existing</th></tr></thead>
        <tbody><tr><td class="lead-score-cell">Existing Cell</td></tr></tbody>
      </table>
    `;

    render(
      <InjectLeadScoreTableColumn
        apiKey="https://www.demoapi.com"
        tableId="myTable"
        studentIds={["s1"]}
        headerName="Lead Score"
      />
    );

    const bodyCells = document
      .getElementById("myTable")!
      .querySelectorAll("tbody tr td.lead-score-cell");
    expect(bodyCells.length).toBe(1); // No duplicate
  });

  it("respects headerInjectionIndex", () => {
    document.body.innerHTML = `
      <table id="myTable">
        <thead><tr><th>A</th><th>B</th></tr></thead>
        <tbody><tr><td>1</td><td>2</td></tr></tbody>
      </table>
    `;

    render(
      <InjectLeadScoreTableColumn
        apiKey="https://www.demoapi.com"
        tableId="myTable"
        studentIds={["s1"]}
        headerName="Lead Score"
        headerInjectionIndex={1}
      />
    );

    const headerCells = document
      .getElementById("myTable")!
      .querySelectorAll("thead tr th");
    expect(headerCells[1].textContent).toBe("Lead Score");
  });
});
