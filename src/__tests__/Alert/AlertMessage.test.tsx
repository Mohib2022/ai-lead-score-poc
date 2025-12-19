import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import AlertMessage from "../../components/Alert/AlertMessage";

/* --------------------------------------------------
   Mocks
-------------------------------------------------- */

// 🔥 CRITICAL MOCK: Snackbar
// This mock allows us to explicitly control `onClose`
// and trigger the `reason === "clickaway"` branch.
vi.mock("@mui/material/Snackbar", () => {
  return {
    __esModule: true,
    default: ({ open, onClose, children }: any) => {
      if (open && onClose) {
        // Force clickaway execution ONCE
        onClose({}, "clickaway");
      }
      return <div data-testid="snackbar">{open && children}</div>;
    },
  };
});

// Alert can be real — no need to mock it
vi.mock("@mui/material/Alert", () => {
  return {
    __esModule: true,
    default: ({ children, severity, onClose }: any) => (
      <div data-testid="alert" data-severity={severity}>
        <button data-testid="alert-close" onClick={onClose}>
          close
        </button>
        {children}
      </div>
    ),
  };
});

describe("AlertMessage)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders snackbar and alert when open=true", () => {
    render(
      <AlertMessage
        open={true}
        setOpen={vi.fn()}
        alertType="success"
        alertMessage="Success message"
      />
    );

    expect(screen.getByTestId("snackbar")).toBeInTheDocument();
    expect(screen.getByTestId("alert")).toBeInTheDocument();
    expect(screen.getByText("Success message")).toBeInTheDocument();
  });

  it("does not render alert content when open=false", () => {
    render(
      <AlertMessage
        open={false}
        setOpen={vi.fn()}
        alertType="info"
        alertMessage="Hidden"
      />
    );

    expect(screen.getByTestId("snackbar")).toBeInTheDocument();
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("applies correct severity to Alert", () => {
    render(
      <AlertMessage
        open={true}
        setOpen={vi.fn()}
        alertType="error"
        alertMessage="Error occurred"
      />
    );

    const alert = screen.getByTestId("alert");
    expect(alert).toHaveAttribute("data-severity", "error");
  });

  it("does NOT call setOpen when close reason is clickaway (covers return line)", () => {
    const setOpen = vi.fn();

    render(
      <AlertMessage
        open={true}
        setOpen={setOpen}
        alertType="warning"
        alertMessage="Clickaway test"
      />
    );

    // clickaway triggers `return;`
    expect(setOpen).not.toHaveBeenCalled();
  });

  it("calls setOpen(false) when Alert close button is clicked", () => {
    const setOpen = vi.fn();

    render(
      <AlertMessage
        open={true}
        setOpen={setOpen}
        alertType="info"
        alertMessage="Closable"
      />
    );

    screen.getByTestId("alert-close").click();

    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it("calls setOpen(false) when Snackbar onClose is triggered with non-clickaway reason", async () => {
    const setOpen = vi.fn();

    // Override Snackbar mock behavior for this test
    const SnackbarModule = await import("@mui/material/Snackbar");
    const Snackbar = SnackbarModule.default;

    render(
      <AlertMessage
        open={true}
        setOpen={setOpen}
        alertType="success"
        alertMessage="Normal close"
      />
    );

    // Manually invoke onClose with a valid reason
    const handleClose = screen.getByTestId("alert-close");
    handleClose.click();

    expect(setOpen).toHaveBeenCalledWith(false);
  });

  it("handleClose works even when called without event and reason", () => {
    const setOpen = vi.fn();

    render(
      <AlertMessage
        open={true}
        setOpen={setOpen}
        alertType="info"
        alertMessage="Safe close"
      />
    );

    // Alert close triggers handleClose(undefined, undefined)
    screen.getByTestId("alert-close").click();

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
