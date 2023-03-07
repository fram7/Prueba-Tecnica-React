import { API } from "./API";

export const getProducts = async () => {
  const { data } = await API.get(`/products`);

  return data;
};

export const getProductByID = async (productID) => {
  const { data } = await API.get(`/products/${productID}`);

  return data;
};
