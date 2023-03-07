import { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";
import { getProducts } from "../services/products";
import ListProducts from "../components/product/ListProducts";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProductsAsync = async () => {
    setIsLoading(true);
    const data = await getProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProductsAsync();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <ListProducts products={products} />
    </>
  );
}
