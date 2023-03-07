import Loading from "../components/loading/Loading";
import ListProducts from "../components/product/ListProducts";
import Products from "../services/products";

export default function Home() {
  const { isLoading, data: products } = Products.GetProducts();

  if (isLoading) return <Loading />;

  return <>{products != null ? <ListProducts products={products} /> : <h1>No hay datos</h1>}</>;
}
