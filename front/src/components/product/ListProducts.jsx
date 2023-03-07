import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import ProductHeader from "./ProductHeader";

export default function ListProducts({ products }) {
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
