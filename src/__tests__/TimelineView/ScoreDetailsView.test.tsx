import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ScoreDetailsCardView from "../../components/TimelineView/ScoreDetailsCardView";
import ScoreDetailsTableView from "../../components/TimelineView/ScoreDetailsTableView";
import ScoreDetailsTimelineView from "../../components/TimelineView/ScoreDetailsTimelineView";
import ScoreDetailsTimeline from "../../components/TimelineView/ScoreDetailsTimeline";

describe("Timeline View", () => {
  const timelineDetails = [
    {
      date: "22/11/2025",
      score: 100,
      message: "Application submitted",
    },
  ];
  it("Render ScoreDetailsCardView with details and className", () => {
    render(
      <ScoreDetailsCardView
        timelineDetails={timelineDetails}
        className="timeline-card"
      />
    );
    expect(screen.getByText("22/11/2025")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
  });
  it("Render ScoreDetailsTableView with details and className", () => {
    render(
      <ScoreDetailsTableView
        timelineDetails={timelineDetails}
        className="timeline-card"
      />
    );
    expect(screen.getByText("22/11/2025")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
  });
  it("Render ScoreDetailsTimelineView with details and className", () => {
    render(
      <ScoreDetailsTimelineView
        timelineDetails={timelineDetails}
        className="timeline-card"
      />
    );
    expect(screen.getByText("22/11/2025")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
  });
  it("Render ScoreDetailsTimeline with details and table view", () => {
    render(
      <ScoreDetailsTimeline
        timelineDetails={timelineDetails}
        timelineType="table"
        classes={{
          table: "timeline-table",
          card: "timeline-card",
          timeline: "timeline",
        }}
      />
    );
    expect(screen.getByText("22/11/2025")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
  });
  it("Render ScoreDetailsTimeline with details and card view", () => {
    render(
      <ScoreDetailsTimeline
        timelineDetails={timelineDetails}
        timelineType="card"
        classes={{
          table: "timeline-table",
          card: "timeline-card",
          timeline: "timeline",
        }}
      />
    );
    expect(screen.getByText("22/11/2025")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
  });
  it("Render ScoreDetailsTimeline with details and timeline view", () => {
    render(
      <ScoreDetailsTimeline
        timelineDetails={timelineDetails}
        timelineType="timeline"
        classes={{
          table: "timeline-table",
          card: "timeline-card",
          timeline: "timeline",
        }}
      />
    );
    expect(screen.getByText("22/11/2025")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("Application submitted")).toBeInTheDocument();
  });
  it("Render ScoreDetailsTimeline with no timelineType", () => {
    render(
      <ScoreDetailsTimeline
        timelineDetails={timelineDetails}
        timelineType={undefined}
        classes={{
          table: "timeline-table",
          card: "timeline-card",
          timeline: "timeline",
        }}
      />
    );
    expect(screen.queryByText("22/11/2025")).not.toBeInTheDocument();
    expect(screen.queryByText("100")).not.toBeInTheDocument();
    expect(screen.queryByText("Application submitted")).not.toBeInTheDocument();
  });
});
