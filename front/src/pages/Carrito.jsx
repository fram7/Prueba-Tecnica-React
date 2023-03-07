import { Alert, Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useContext } from "react";
import TableShoppingCart from "../components/shoppingCart/TableShoppingCart";
import { ProductContext } from "../context/ProductContext";

export default function Carrito() {
  const { carrito, addCarrito, removeCarrito } = useContext(ProductContext);

  return (
    <Container maxWidth="md" component="main">
      <Grid>
        <Stack spacing={2}>
          <Typography variant="body1">Your shoping cart:</Typography>
          {carrito != null && carrito.length > 0 ? (
            <TableShoppingCart
              carrito={carrito}
              addCarrito={addCarrito}
              removeCarrito={removeCarrito}
            />
          ) : (
            <Alert severity="info">No item in the cart!</Alert>
          )}
        </Stack>
      </Grid>
    </Container>
  );
}
