import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useState } from "react";
import { getProductByID } from "../services/products";
import Loading from "../components/loading/Loading";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { Container, Stack } from "@mui/system";
import { ProductContext } from "../context/ProductContext";

export const calcularStock = (id, countInStock, carrito) => {
  let count = countInStock;

  const unProducto = carrito.find((l) => l.product._id === id);

  if (unProducto != null) {
    count -= unProducto.count;
  }

  return count;
};

export default function Product() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { _id, name, image, description, countInStock } = product;
  const { carrito, addCarrito } = useContext(ProductContext);

  const getProductByIdAsync = async (id) => {
    setIsLoading(true);
    const data = await getProductByID(id);
    setProduct(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductByIdAsync(id);
  }, [id]);

  const onClickAddCart = (product) => {
    addCarrito(product);
  };

  if (isLoading) return <Loading />;

  return (
    <Container maxWidth="md" component="main">
      <Grid>
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
                Stock: {calcularStock(_id, countInStock, carrito)}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              disabled={calcularStock(_id, countInStock, carrito) === 0}
              onClick={() => onClickAddCart(product)}
            >
              Add item to cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Container>
  );
}
