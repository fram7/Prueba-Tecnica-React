import { BrowserRouter } from "react-router-dom";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AppRouter from "./AppRouter";
import ErrorHandler from "../components/errorHandler/ErrorHandler";

export default function Main() {
  const [error, setError] = useState<{ error?: unknown; open: boolean }>({
    open: false,
  });

  const queryClient = new QueryClient({
    // https://tkdodo.eu/blog/react-query-error-handling
    queryCache: new QueryCache({
      onError: (error, query) => {
        setError({
          open: true,
          error: error,
        });
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, query) => {
        setError({
          open: true,
          error: error,
        });
      },
    }),
  });

  function handleClose(event?: React.SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setError({
      open: false,
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <ErrorHandler open={error.open} error={error.error} handleClose={handleClose} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
