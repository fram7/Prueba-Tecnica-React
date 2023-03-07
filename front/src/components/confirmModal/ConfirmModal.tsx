import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Producto } from "../../types/Producto";

interface ConfirmModalProps {
  validProduct: Producto | null;
  action: Function;
  setValidProduct: Function;
}

export default function ConfirmModal({ validProduct, action, setValidProduct }: ConfirmModalProps) {
  const handleYes = () => {
    setValidProduct(null);
    action(validProduct);
  };

  const handleNo = () => {
    setValidProduct(null);
  };

  return (
    <Dialog
      open={validProduct != null}
      onClose={handleNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Remove item validation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Your are going to remove the item from the cart, are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNo}>No</Button>
        <Button onClick={handleYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
