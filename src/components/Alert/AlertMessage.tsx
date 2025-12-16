import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { Dispatch } from "react";

interface AlertMessageProps {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  alertType: "success" | "info" | "warning" | "error";
  alertMessage: string;
}

export default function AlertMessage({
  open,
  setOpen,
  alertType,
  alertMessage,
}: AlertMessageProps) {
  const handleClose = (
    _?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={alertType}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
}
