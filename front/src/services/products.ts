import { useQuery } from "@tanstack/react-query";
import { Producto } from "../types/Producto";
import { API } from "./API";

const getProductsAPI = async () => {
  await new Promise((r) => setTimeout(r, 1000));
  const { data } = await API.get<Producto[]>(`/products`);

  return data;
};

const getProductByIDAPI = async (productID: number) => {
  await new Promise((r) => setTimeout(r, 1000));
  const { data } = await API.get<Producto>(`/products/${productID}`);

  return data;
};

const Products = {
  GetProducts: () => {
    return useQuery(["Products"], () => getProductsAPI());
  },
  GetProductById: (id: number) => {
    return useQuery(["Products", id], () => getProductByIDAPI(id), {
      enabled: Boolean(id) && id > 0,
    });
  },
};

export default Products;
