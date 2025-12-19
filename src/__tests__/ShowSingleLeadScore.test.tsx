import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import ShowSingleLeadScore from "../components/ShowSingleLeadScore";

// Mock sub-components
vi.mock("../components/TimelineView/ScoreChip", () => ({
  default: ({ score }: { score: number }) => (
    <div data-testid="score-chip">{score}</div>
  ),
}));

vi.mock("../components/Alert/ErrorAlert", () => ({
  default: ({ apiKey }: { apiKey: string }) => (
    <div data-testid="error-alert">{apiKey}</div>
  ),
}));

describe("ShowSingleLeadScore", () => {
  it("renders ErrorAlert if apiKey is invalid", () => {
    render(<ShowSingleLeadScore apiKey="invalid" studentId="1" />);
    expect(screen.getByTestId("error-alert")).toBeInTheDocument();
  });

  it("shows Skeleton while loading", () => {
    render(
      <ShowSingleLeadScore apiKey="https://www.demoapi.com" studentId="1" />
    );

    // Skeleton has no role → query by class or test id
    const skeleton = document.querySelector(".MuiSkeleton-root");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders ScoreChip after data is loaded", async () => {
    render(
      <ShowSingleLeadScore apiKey="https://www.demoapi.com" studentId="1" />
    );

    const chip = await screen.findByTestId("score-chip", {}, { timeout: 2000 });

    const score = Number(chip.textContent);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it("renders CustomComponent correctly", async () => {
    const CustomComponent = ({
      isLoading,
      score,
    }: {
      isLoading: boolean;
      score: number;
    }) => <div data-testid="custom">{isLoading ? "loading" : score}</div>;

    render(
      <ShowSingleLeadScore
        apiKey="https://www.demoapi.com"
        studentId="1"
        CustomComponent={CustomComponent}
      />
    );
    const customComponent = screen.getByTestId("custom");
    expect(customComponent).toHaveTextContent("loading");

    // Wait for loading to finish
    await waitFor(
      () => {
        const text = customComponent.textContent;

        expect(text).not.toBe("loading");
      },
      { timeout: 2000 }
    );

    expect(Number(customComponent.textContent)).lessThanOrEqual(100);
  });
});
