import { describe, expect, it } from "vitest";
import ScoreSkeleton from "../../components/Skeleton/ScoreSkeleton";
import { render, screen } from "@testing-library/react";

describe("Skeleton", () => {
  const classes = {
    card: "card",
    timeline: "timeline",
    table: "table",
  };
  it("Testing Score Skeleton > timelineCardSkeleton", () => {
    render(
      <ScoreSkeleton
        timelineType="timeline"
        classes={classes}
        timelinePosition="alternate"
      />
    );
    expect(screen.getByTestId("timeline-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("table-skeleton")).not.toBeInTheDocument();
  });
  it("Testing Score Skeleton > timelineTableSkeleton", () => {
    render(<ScoreSkeleton timelineType="table" classes={classes} />);

    expect(screen.getByTestId("table-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("timeline-skeleton")).not.toBeInTheDocument();
  });
  it("Testing Score Skeleton > timelineCardSkeleton", () => {
    render(<ScoreSkeleton timelineType="card" classes={classes} />);

    expect(screen.getByTestId("card-skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("table-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("timeline-skeleton")).not.toBeInTheDocument();
  });
  it("Testing Score Skeleton with no timelineType", () => {
    render(<ScoreSkeleton timelineType={undefined} classes={classes} />);

    expect(screen.queryByTestId("card-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("table-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("timeline-skeleton")).not.toBeInTheDocument();
  });
});
