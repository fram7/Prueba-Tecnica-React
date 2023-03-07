import { Alert, Container, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import TableShoppingCart from "../components/shoppingCart/TableShoppingCart";
// import { useContext } from "react";
// import { ProductContext } from "../context/ProductContext";
import { useShoppingCart } from "../context/useShoppingCart";

export default function Carrito() {
  // const { carrito, addCarrito, removeCarrito } = useContext(ProductContext);
  const { shoppingCart, addItemToCart, removeItemToCart } = useShoppingCart();

  return (
    <Container maxWidth="md" component="main">
      <Grid>
        <Stack spacing={2}>
          <Typography variant="body1">Your shoping cart:</Typography>
          {shoppingCart != null && shoppingCart.length > 0 ? (
            <TableShoppingCart
              carrito={shoppingCart}
              addCarrito={addItemToCart}
              removeCarrito={removeItemToCart}
            />
          ) : (
            <Alert severity="info">No item in the cart!</Alert>
          )}
        </Stack>
      </Grid>
    </Container>
  );
}
