import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import LeadScoreTimelineDialog from "../components/LeadScoreTimelineDialog";

/* -------------------------------------------------
   Mocks
-------------------------------------------------- */

vi.mock("../components/LeadScoreTimeline", () => ({
  default: ({ timelineType }: { timelineType: string }) => (
    <div data-testid="lead-score-timeline">timeline:{timelineType}</div>
  ),
}));

vi.mock("../components/Alert/ErrorAlert", () => ({
  default: ({ apiKey }: { apiKey: string }) => (
    <div data-testid="error-alert">{apiKey}</div>
  ),
}));

/* -------------------------------------------------
   Utilities
-------------------------------------------------- */

const DialogInitiator = ({ onClick }: { onClick: () => void }) => (
  <button data-testid="open-dialog" onClick={onClick}>
    open
  </button>
);

/* -------------------------------------------------
   Tests
-------------------------------------------------- */

describe("LeadScoreTimelineDialog", () => {
  it("renders ErrorAlert when apiKey is invalid", () => {
    render(
      <LeadScoreTimelineDialog
        apiKey="invalid"
        studentId="1"
        DialogInitiator={DialogInitiator}
      />
    );

    expect(screen.getByTestId("error-alert")).toHaveTextContent("invalid");
  });

  it("does not open dialog by default", () => {
    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
      />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens default dialog when initiator is clicked", async () => {
    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
      />
    );

    fireEvent.click(screen.getByTestId("open-dialog"));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Lead Score Timeline")).toBeInTheDocument();
  });

  it("closes dialog using Close button", async () => {
    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
      />
    );

    fireEvent.click(screen.getByTestId("open-dialog"));

    const closeBtn = await screen.findByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes dialog using close icon", async () => {
    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
      />
    );

    fireEvent.click(screen.getByTestId("open-dialog"));
    const closeIcon = await screen.findByTestId("close-icon");

    fireEvent.click(closeIcon);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders LeadScoreTimeline with default timeline type", async () => {
    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
      />
    );

    fireEvent.click(screen.getByTestId("open-dialog"));

    const timeline = await screen.findByTestId("lead-score-timeline");
    expect(timeline).toHaveTextContent("timeline:timeline");
  });

  it("changes timeline type using Autocomplete", async () => {
    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
      />
    );

    fireEvent.click(screen.getByTestId("open-dialog"));
    const input = screen.getByLabelText("Timeline Type");
    // Open dropdown
    fireEvent.mouseDown(input);

    // Select option via keyboard
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByTestId("lead-score-timeline")).toHaveTextContent(
        "timeline:table"
      );
    });
  });

  it("hides Autocomplete when CustomTimeline is provided", async () => {
    const CustomTimeline = () => (
      <div data-testid="custom-timeline">custom</div>
    );

    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
        CustomTimeline={CustomTimeline}
      />
    );

    fireEvent.click(screen.getByTestId("open-dialog"));

    expect(screen.queryByLabelText("Timeline Type")).not.toBeInTheDocument();
  });

  it("renders TimelineDialog when provided and fetches data", async () => {
    const TimelineDialog = ({ open, isLoading, leadScoreDetails }: any) => (
      <div data-testid="custom-dialog">
        {open && (isLoading ? "loading" : leadScoreDetails.length)}
      </div>
    );

    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
        TimelineDialog={TimelineDialog}
      />
    );

    fireEvent.click(screen.getByTestId("open-dialog"));

    await waitFor(
      () => {
        expect(screen.getByTestId("custom-dialog")).toHaveTextContent("2");
      },
      { timeout: 2000 }
    );
  });
  it("closes dialog when clicking outside (backdrop)", async () => {
    render(
      <LeadScoreTimelineDialog
        apiKey="https://www.demoapi.com"
        studentId="1"
        DialogInitiator={DialogInitiator}
      />
    );

    // Open dialog
    fireEvent.click(screen.getByTestId("open-dialog"));

    // Ensure dialog is open
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();

    // MUI backdrop element
    const backdrop = document.querySelector(".MuiBackdrop-root");
    expect(backdrop).toBeInTheDocument();

    // Click outside dialog
    fireEvent.mouseDown(backdrop!);
    fireEvent.click(backdrop!);

    // Dialog should close
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
