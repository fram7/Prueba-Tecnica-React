import { Producto } from "../types/Producto";
import { API } from "./API";

export const getProducts = async () => {
  const { data } = await API.get<Producto[]>(`/products`);

  return data;
};

export const getProductByID = async (productID: number) => {
  const { data } = await API.get<Producto>(`/products/${productID}`);

  return data;
};
