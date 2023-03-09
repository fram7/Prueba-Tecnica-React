import { createContext, useEffect, useState } from "react";

//Crear el context
export const ProductContext = createContext();

//Provider de datos y funciones
const ProductProvider = ({ children }) => {
  //1. Creamos una variable constante con KEY de Localstorage
  const _PRODUCT_LOCALSTORAGE = "lsProduct";

  //2. Creamos una propiedad lsCarrito que trae lo almacenado en localstorage
  const lsCarrito = localStorage.getItem(_PRODUCT_LOCALSTORAGE);

  //3.1 lsCarrito es null (signficia que no tengo nada almacenado en LS) => inicio un arreglo vacio
  // 3.2 si lsCarrito trae algo (string) signifca que ya guarde algo y lo deserealizo para convertiro en el arreglo de items del carrito
  const [carrito, setCarrito] = useState(lsCarrito != null ? JSON.parse(lsCarrito) : []);

  //Opcion con USE EFFECT 4. Cree un useEffect que escucha a carrito y setCarrito y cada vez que carrito se modifica (setCarrito) guardo ese resultado en el localstorage. Como es LS paso el JSON (Arreglo) a un String utiliznado JSON.stringify
  // useEffect(() => {
  //   localStorage.setItem(_PRODUCT_LOCALSTORAGE, JSON.stringify(carrito));
  // }, [carrito, setCarrito]);

  ////Opcion SIN USE EFFECT (Mejor)  Funcion que setea el carrito y lo guarda en localstorage
  const actualizarCartrito = (unCarrito) => {
    setCarrito(unCarrito);
    localStorage.setItem(_PRODUCT_LOCALSTORAGE, JSON.stringify(unCarrito));
  };

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
    actualizarCartrito(copyCarrito);
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
      actualizarCartrito(copyCarrito);
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
