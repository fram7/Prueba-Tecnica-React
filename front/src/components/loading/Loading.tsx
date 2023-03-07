import { CircularProgress, Typography, Stack, Modal, Box, Fade } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

interface LoadingModalProps {
  isOpen?: boolean;
  text?: string;
}
export default function Loading({ isOpen = true, text = "Cargando" }: LoadingModalProps) {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // Por si quiero ponerlo en un cuadradito activo estas propiedades de abajo
    width: 300,
    borderRadius: "10px",
    bgcolor: "background.paper",
    border: "1px solid primary.main",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={() => {}}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
            <CircularProgress size={30} />
            <Typography variant="h5" color="black">
              {text}
            </Typography>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
