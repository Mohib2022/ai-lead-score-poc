import { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage";
interface ErrorAlertProps {
  apiKey: string;
}
function ErrorAlert({ apiKey }: ErrorAlertProps) {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (apiKey !== "https://www.demoapi.com") {
      setErrorMessage("API key is invalid! Please provide authorized api key.");
      setOpen(true);
    }
  }, [apiKey]);

  return (
    <AlertMessage
      alertType="error"
      alertMessage={errorMessage}
      open={open}
      setOpen={setOpen}
    />
  );
}

export default ErrorAlert;
