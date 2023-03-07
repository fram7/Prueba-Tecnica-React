import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Loading from "../components/loading/Loading";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { ItemCarrito } from "../types/ItemCarrito";
import { Producto } from "../types/Producto";
import Products from "../services/products";
import { useShoppingCart } from "../context/useShoppingCart";

export const calcularStock = (id: number, countInStock: number, carrito: ItemCarrito[]) => {
  let count = countInStock;

  const unProducto = carrito.find((l) => l.product._id === id);

  if (unProducto != null) {
    count -= unProducto.count;
  }

  return count;
};

export default function Product() {
  const { id } = useParams();
  // const { carrito, addCarrito } = useContext(ProductContext);
  const { shoppingCart, addItemToCart } = useShoppingCart();
  const { isLoading, data: product } = Products.GetProductById(+(id ?? -1));
  const { _id, name, image, description, countInStock } = product ?? {};

  const onClickAddCart = (product: Producto) => {
    addItemToCart(product);
  };

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="md" component="main">
      <Grid>
        {product != null && _id != null && countInStock != null ? (
          <Card>
            <CardMedia
              component="img"
              sx={{ objectFit: "contain" }}
              image={`${process.env.REACT_APP_IMAGE_URL}/${image}`}
              title={name}
            />
            <CardContent>
              <Stack direction="column" spacing={1}>
                <Typography gutterBottom variant="h6" component="div">
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontStyle: "italic", textAlign: "justify" }}
                  color="text.secondary"
                >
                  {description}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Stock: {calcularStock(_id, countInStock, shoppingCart)}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                disabled={calcularStock(_id, countInStock, shoppingCart) === 0}
                onClick={() => onClickAddCart(product)}
              >
                Add item to cart
              </Button>
            </CardActions>
          </Card>
        ) : (
          <></>
        )}
      </Grid>
    </Container>
  );
}
