import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import LeadScoreTimeline from "../components/LeadScoreTimeline";

/* -----------------------------
   MOCK CHILD COMPONENTS
--------------------------------*/

// Skeleton
vi.mock("../components/Skeleton/ScoreSkeleton", () => ({
  default: ({ timelineType }: { timelineType: string }) => (
    <div data-testid="score-skeleton">skeleton:{timelineType}</div>
  ),
}));

// Timeline view
vi.mock("../components/TimelineView/ScoreDetailsTimeline", () => ({
  default: ({ timelineType, timelineDetails, classes }: any) => (
    <div data-testid="score-details-timeline">
      timeline:{timelineType}|items:{timelineDetails.length}|classes
      {classes?.card}
      {classes?.timeline}
      {classes?.table}
    </div>
  ),
}));

// Error alert
vi.mock("../components/Alert/ErrorAlert", () => ({
  default: ({ apiKey }: any) => (
    <div data-testid="error-alert">error:{apiKey}</div>
  ),
}));
it("shows skeleton while loading by default", () => {
  render(<LeadScoreTimeline apiKey="https://www.demoapi.com" studentId="1" />);

  expect(screen.getByTestId("score-skeleton")).toHaveTextContent(
    "skeleton:timeline"
  );
});

it("renders ErrorAlert when apiKey is invalid", () => {
  render(<LeadScoreTimeline apiKey="invalid-key" studentId="1" />);

  expect(screen.getByTestId("error-alert")).toHaveTextContent(
    "error:invalid-key"
  );
});

it("renders ScoreDetailsTimeline after loading", async () => {
  render(
    <LeadScoreTimeline
      apiKey="https://www.demoapi.com"
      studentId="1"
      timelineType="card"
    />
  );

  await waitFor(
    async () => {
      const timeline = await screen.findByTestId("score-details-timeline");

      expect(timeline).toHaveTextContent("timeline:card");
      expect(timeline).toHaveTextContent("items:2");
    },
    { timeout: 2000 }
  );
});

it("renders CustomTimeline when provided", async () => {
  const CustomTimeline = ({ isLoading, timelineDetails }: any) => (
    <div data-testid="custom-timeline">
      {isLoading ? "loading" : `items:${timelineDetails.length}`}
    </div>
  );

  render(
    <LeadScoreTimeline
      apiKey="https://www.demoapi.com"
      studentId="1"
      CustomTimeline={CustomTimeline}
    />
  );

  // initial loading
  expect(screen.getByTestId("custom-timeline")).toHaveTextContent("loading");

  // after load
  await waitFor(
    () => {
      expect(screen.getByTestId("custom-timeline")).toHaveTextContent(
        "items:2"
      );
    },
    { timeout: 2000 }
  );
});

it("accepts and forwards classes prop", async () => {
  render(
    <LeadScoreTimeline
      apiKey="https://www.demoapi.com"
      studentId="1"
      classes={{
        timeline: "t",
        card: "c",
        table: "tb",
      }}
    />
  );
  await waitFor(
    async () => {
      const timeline = await screen.findByTestId("score-details-timeline");
      expect(timeline).toBeInTheDocument();
    },
    { timeout: 2000 }
  );
});
it("uses default timelineType when not provided", async () => {
  render(<LeadScoreTimeline apiKey="https://www.demoapi.com" studentId="1" />);

  await waitFor(
    async () => {
      const timeline = await screen.findByTestId("score-details-timeline");
      expect(timeline).toHaveTextContent("timeline:timeline");
    },
    { timeout: 2000 }
  );
});
