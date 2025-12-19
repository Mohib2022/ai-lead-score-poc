import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import MultipleStudentLeadScore from "../components/MultipleStudentLeadScore";

/* -------------------------------------------------
   Mocks
-------------------------------------------------- */

vi.mock("../components/TimelineView/ScoreChip", () => ({
  default: ({ score }: { score: number }) => (
    <div data-testid="score-chip">{score}</div>
  ),
}));

vi.mock("../components/Skeleton/TimelineTableSkeleton", () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="table-skeleton" className={className}>
      loading-table
    </div>
  ),
}));

vi.mock("../components/Alert/ErrorAlert", () => ({
  default: ({ apiKey }: { apiKey: string }) => (
    <div data-testid="error-alert">{apiKey}</div>
  ),
}));

vi.mock("../components/LeadScoreTimelineDialog", () => ({
  default: ({
    DialogInitiator,
  }: {
    DialogInitiator: React.ComponentType<{ onClick: () => void }>;
  }) => (
    <div data-testid="timeline-dialog">
      <DialogInitiator onClick={vi.fn()} />
    </div>
  ),
}));

/* -------------------------------------------------
   Tests
-------------------------------------------------- */

describe("MultipleStudentLeadScore", () => {
  const studentIds = ["1", "2"];

  it("renders ErrorAlert when apiKey is invalid", () => {
    render(
      <MultipleStudentLeadScore apiKey="invalid" studentIds={studentIds} />
    );

    expect(screen.getByTestId("error-alert")).toHaveTextContent("invalid");
  });

  it("renders default skeleton while loading", () => {
    render(
      <MultipleStudentLeadScore
        apiKey="https://www.demoapi.com"
        studentIds={studentIds}
        className="custom-class"
      />
    );

    const skeleton = screen.getByTestId("table-skeleton");
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("custom-class");
  });

  it("renders custom loader when provided", () => {
    render(
      <MultipleStudentLeadScore
        apiKey="https://www.demoapi.com"
        studentIds={studentIds}
        loader={<div data-testid="custom-loader">my-loader</div>}
      />
    );

    expect(screen.getByTestId("custom-loader")).toBeInTheDocument();
  });

  it("renders table with student rows after loading", async () => {
    render(
      <MultipleStudentLeadScore
        apiKey="https://www.demoapi.com"
        studentIds={studentIds}
      />
    );

    await waitFor(
      () => {
        expect(screen.getAllByTestId("score-chip").length).toBe(2);
      },
      { timeout: 2000 }
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("AI Lead Score")).toBeInTheDocument();
  });

  it("renders LeadScoreTimelineDialog for each student", async () => {
    render(
      <MultipleStudentLeadScore
        apiKey="https://www.demoapi.com"
        studentIds={studentIds}
      />
    );

    await waitFor(
      () => {
        expect(screen.getAllByTestId("score-chip").length).toBe(2);
      },
      { timeout: 2000 }
    );

    expect(screen.getByText("Student 0")).toBeInTheDocument();
    expect(screen.getByText("Student 1")).toBeInTheDocument();
  });

  it("renders CustomComponent instead of table when provided", async () => {
    const CustomComponent = ({ scores }: { scores: Array<any> }) => (
      <div>
        {scores.map((s) => (
          <p data-testid="custom-component">{s.studentId}</p>
        ))}
      </div>
    );

    render(
      <MultipleStudentLeadScore
        apiKey="https://www.demoapi.com"
        studentIds={studentIds}
        CustomComponent={CustomComponent}
      />
    );
    await waitFor(
      () => {
        expect(screen.getAllByTestId("custom-component").length).toBe(2);
      },
      { timeout: 2000 }
    );
    const custom = await screen.findAllByTestId("custom-component");
    expect(custom).length(2);
  });
});
