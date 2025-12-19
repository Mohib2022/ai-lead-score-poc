import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ErrorAlert from "../../components/Alert/ErrorAlert";

/* --------------------------------------------------
   Mock AlertMessage
-------------------------------------------------- */
const alertMessageMock = vi.fn();

vi.mock("../../components/Alert/AlertMessage", () => ({
  __esModule: true,
  default: (props: any) => {
    alertMessageMock(props);
    return (
      <div data-testid="alert-message">{props.open && props.alertMessage}</div>
    );
  },
}));

describe("ErrorAlert", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows error alert when apiKey is invalid", () => {
    render(<ErrorAlert apiKey="invalid-key" />);

    // AlertMessage rendered
    expect(screen.getByTestId("alert-message")).toBeInTheDocument();

    // Error message visible
    expect(
      screen.getByText("API key is invalid! Please provide authorized api key.")
    ).toBeInTheDocument();

    // Props validation
    expect(alertMessageMock).toHaveBeenCalledWith(
      expect.objectContaining({
        open: true,
        alertType: "error",
        alertMessage: "API key is invalid! Please provide authorized api key.",
        setOpen: expect.any(Function),
      })
    );
  });

  it("does not open alert when apiKey is valid", () => {
    render(<ErrorAlert apiKey="https://www.demoapi.com" />);

    // AlertMessage still renders, but closed
    expect(screen.getByTestId("alert-message")).toBeInTheDocument();

    // Message NOT visible
    expect(
      screen.queryByText(
        "API key is invalid! Please provide authorized api key."
      )
    ).not.toBeInTheDocument();

    // open=false path covered
    expect(alertMessageMock).toHaveBeenCalledWith(
      expect.objectContaining({
        open: false,
        alertMessage: "",
      })
    );
  });

  it("reacts to apiKey change (useEffect dependency covered)", () => {
    const { rerender } = render(
      <ErrorAlert apiKey="https://www.demoapi.com" />
    );

    // Change apiKey → triggers useEffect
    rerender(<ErrorAlert apiKey="bad-key" />);

    expect(
      screen.getByText("API key is invalid! Please provide authorized api key.")
    ).toBeInTheDocument();
  });

  it("setOpen function passed to AlertMessage can be called safely", () => {
    render(<ErrorAlert apiKey="invalid-key" />);

    const lastCallProps = alertMessageMock.mock.calls.at(-1)?.[0];

    // Simulate AlertMessage closing itself
    lastCallProps.setOpen(false);

    expect(typeof lastCallProps.setOpen).toBe("function");
  });
});
