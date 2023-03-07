import { Producto } from "../types/Producto";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ItemCarrito } from "../types/ItemCarrito";

//FM: En vez de usar atom, uso atomWithStorage para que de una vez me lo guarde en LocalStorage
const cartAtom = atomWithStorage<ItemCarrito[]>("lsProduct", []);

export function useShoppingCart() {
  const [shoppingCart, setShoppingCart] = useAtom(cartAtom);

  const addItemToCart = async (product: Producto) => {
    await new Promise((r) => setTimeout(r, 1000));
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

  const removeItemToCart = async (product: Producto) => {
    await new Promise((r) => setTimeout(r, 1000));
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
