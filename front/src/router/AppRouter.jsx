import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Carrito from "../pages/Carrito";
import { Box, Grid } from "@mui/material";
import Header from "../layout/Header";

export default function AppRouter() {
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <Header />
      {/* <SideMenu open={open} setOpen={setOpen} /> */}
      <Grid container direction="column" justifyContent="flex-start" alignItems="stretch" mt={2}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="carrito" element={<Carrito />} />
        </Routes>
      </Grid>
    </Box>
  );
}
