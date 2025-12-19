import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ScoreChip from "../../components/TimelineView/ScoreChip";

describe("ScoreChip", () => {
  it("renders with color 'error' when score <= 40", () => {
    render(<ScoreChip score={30} />);
    const chip = screen.getByText("30");
    expect(chip).toBeInTheDocument();
  });

  it("renders with color 'warning' when score > 40 and <= 70", () => {
    render(<ScoreChip score={50} />);
    const chip = screen.getByText("50");
    expect(chip).toBeInTheDocument();
  });

  it("renders with color 'success' when score > 70", () => {
    render(<ScoreChip score={85} />);
    const chip = screen.getByText("85");
    expect(chip).toBeInTheDocument();
  });
});
