import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import ProductHeader from "./ProductHeader";
import { Producto } from "../../types/Producto";

interface ListProductsProps {
  products: Producto[];
}

export default function ListProducts({ products }: ListProductsProps) {
  return (
    <>
      <Container maxWidth="md" component="main">
        <Grid container spacing={4}>
          {products.map((aProduct, index) => (
            <ProductHeader key={index} product={aProduct} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
