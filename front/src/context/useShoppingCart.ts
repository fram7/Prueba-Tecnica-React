import { Producto } from "../types/Producto";
import { atom, useAtom } from "jotai";
import { ItemCarrito } from "../types/ItemCarrito";

export function useShoppingCart() {
  const cartAtom = atom<ItemCarrito[]>([]);

  const [shoppingCart, setShoppingCart] = useAtom(cartAtom);

  const addItemToCart = (product: Producto) => {
    const copyCarrito = [...shoppingCart];

    const productExistente = copyCarrito.find((l) => l.product._id === product._id);

    if (productExistente != null) {
      productExistente.count += 1;
    } else {
      copyCarrito.push({
        count: 1,
        product: product,
      });
    }

    setShoppingCart(copyCarrito);
  };

  const removeItemToCart = (product: Producto) => {
    const copyCarrito = [...shoppingCart];

    const indexProductExistente = copyCarrito.findIndex((l) => l.product._id === product._id);

    if (indexProductExistente >= 0) {
      const productExistente = copyCarrito[indexProductExistente];
      productExistente.count -= 1;

      if (productExistente.count === 0) {
        copyCarrito.splice(indexProductExistente, 1);
      }
      setShoppingCart(copyCarrito);
    }
  };

  return {
    shoppingCart,
    addItemToCart,
    removeItemToCart,
  };
}
