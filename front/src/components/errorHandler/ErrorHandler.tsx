import Snackbar from "@mui/material/Snackbar";
import { Alert, Link, Box } from "@mui/material";
import { AxiosError } from "axios";
import { useState } from "react";
import { ErrorItem } from "./ErrorItem";

interface ErrorMessageProps {
  open: boolean;
  error: unknown;
  handleClose: any;
}
export default function ErrorHandler({ open, handleClose, error }: ErrorMessageProps) {
  const [showDetail, setShowDetail] = useState(false);

  if (error as AxiosError) {
    const errorAxios = error as AxiosError;

    return (
      <Snackbar
        onClose={handleClose}
        open={open}
        // autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <Link
            href="#"
            color="inherit"
            underline="hover"
            onClick={() => {
              setShowDetail((e) => !e);
            }}
          >
            {errorAxios.message}
          </Link>
          {showDetail && (
            <Box
              sx={{
                marginTop: "5px",
                marginLeft: "20px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowDetail((e) => !e);
              }}
            >
              {/* <Typography sx={{ fontWeight: "bold" }} variant="subtitle2">
                Descripción tecnica:
              </Typography> */}

              <ul>
                <ErrorItem titulo={"URL"} texto={errorAxios?.config?.url} />
                <ErrorItem titulo={"Method"} texto={errorAxios?.config?.method} />
                <ErrorItem titulo={"Request"} texto={JSON.stringify(errorAxios.request)} />
                <ErrorItem titulo={"Response"} texto={JSON.stringify(errorAxios.response)} />
              </ul>
            </Box>
          )}
        </Alert>
      </Snackbar>
    );
  } else {
    return (
      <Snackbar
        onClose={handleClose}
        open={open}
        // autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error != null && (error as any).message}
        </Alert>
      </Snackbar>
    );
  }
}
