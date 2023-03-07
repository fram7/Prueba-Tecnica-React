import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { calcularStock } from "../../pages/Product";
import ConfirmModal from "../confirmModal/ConfirmModal";
import { useState } from "react";
import { Producto } from "../../types/Producto";
import { ItemCarrito } from "../../types/ItemCarrito";
import { typeProductContext } from "../../context/ProductContext";

interface TableShoppingCartProps {
  carrito: ItemCarrito[];
  addCarrito: (product: Producto) => void;
  removeCarrito: (product: Producto) => void;
}

export default function TableShoppingCart({
  carrito,
  addCarrito,
  removeCarrito,
}: TableShoppingCartProps) {
  const addCount = (product: Producto) => {
    addCarrito(product);
  };

  const removeCount = (product: Producto, count: number) => {
    if (count === 1) {
      setValidProduct(product);
    } else {
      removeCarrito(product);
    }
  };

  const TAX_RATE = 0.19;

  function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
  }

  const totalPrice = () => {
    let total = 0;

    carrito.forEach((item) => {
      total += item.count * item.product.price;
    });

    return total;
  };

  const [validProduct, setValidProduct] = useState<Producto | null>(null);

  return (
    <>
      <ConfirmModal
        validProduct={validProduct}
        action={removeCarrito}
        setValidProduct={setValidProduct}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell></TableCell>
              <TableCell align="center">Unit. Price</TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carrito.map(({ count, product }, index) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <img
                    style={{
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    alt={product.name}
                    src={`${process.env.REACT_APP_IMAGE_URL}/${product.image}`}
                  />
                </TableCell>
                <TableCell align="left" component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {ccyFormat(product.price)}
                </TableCell>
                <TableCell>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <IconButton
                      color="primary"
                      onClick={() => removeCount(product, count)}
                      component="label"
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                    {count}
                    <IconButton
                      disabled={calcularStock(product._id, product.countInStock, carrito) === 0}
                      color="primary"
                      onClick={() => addCount(product)}
                      component="label"
                    >
                      <AddCircleIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
                <TableCell component="th" scope="row">
                  {ccyFormat(product.price * count)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={4} />
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell align="right">{ccyFormat(totalPrice())}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Tax</TableCell>
              <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell align="right">{ccyFormat(totalPrice() * TAX_RATE)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell align="right">
                {ccyFormat(totalPrice() + totalPrice() * TAX_RATE)}
              </TableCell>
            </TableRow>
          </TableBody>
          {/* <TableFooter sx={{ backgroundColor: "red" }}>
          <Stack sx={{ bgColor: "red" }}>
            <Typography align="center" variant="button">
              Total Price: {}
            </Typography>
          </Stack>
        </TableFooter> */}
        </Table>
      </TableContainer>
    </>
  );
}
