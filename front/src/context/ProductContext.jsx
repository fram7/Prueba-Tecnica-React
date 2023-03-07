import { createContext, useEffect, useState } from "react";

//Crear el context
export const ProductContext = createContext();

//Provider de datos y funciones
const ProductProvider = ({ children }) => {
  const _PRODUCT_LOCALSTORAGE = "lsProduct";

  const lsCarrito = localStorage.getItem(_PRODUCT_LOCALSTORAGE);

  const [carrito, setCarrito] = useState(lsCarrito != null ? JSON.parse(lsCarrito) : []);

  useEffect(() => {
    localStorage.setItem(_PRODUCT_LOCALSTORAGE, JSON.stringify(carrito));
  }, [carrito, setCarrito]);

  const addCarrito = (product) => {
    const copyCarrito = [...carrito];

    const productExistente = copyCarrito.find((l) => l.product._id === product._id);

    if (productExistente != null) {
      productExistente.count += 1;
    } else {
      copyCarrito.push({
        count: 1,
        product: product,
      });
    }
    setCarrito(copyCarrito);
  };

  const removeCarrito = (product) => {
    const copyCarrito = [...carrito];

    const indexProductExistente = copyCarrito.findIndex((l) => l.product._id === product._id);

    if (indexProductExistente >= 0) {
      const productExistente = copyCarrito[indexProductExistente];
      productExistente.count -= 1;

      if (productExistente.count === 0) {
        copyCarrito.splice(indexProductExistente, 1);
      }
      setCarrito(copyCarrito);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        carrito,
        addCarrito,
        removeCarrito,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
