import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ItemCarrito } from "../types/ItemCarrito";
import { useShoppingCart } from "../hooks/useShoppingCart";
// import { useContext } from "react";
// import { ProductContext } from "../context/ProductContext";

export default function Header() {
  const navigate = useNavigate();

  // const { carrito: shoppingCart } = useContext(ProductContext);
  const { shoppingCart } = useShoppingCart();

  const contarCarritos = (carrito: ItemCarrito[]) => {
    let count = 0;

    carrito.forEach((item) => {
      count += item.count;
    });
    return count;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            component="div"
          >
            Ecomsur Store
          </Typography>
          <IconButton
            aria-label="cart"
            color="inherit"
            onClick={() => {
              navigate("/carrito");
            }}
          >
            <Badge badgeContent={contarCarritos(shoppingCart)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
