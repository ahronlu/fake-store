import { Row, Spinner } from "react-bootstrap";
import { ProductCard } from "../components";

export default function Home({ products }) {
  return (
    <Row>
      <h1 className="text-uppercase my-5 text-center">Latest Products</h1>
      {!products?.length ? (
        <Spinner animation="border" className="mx-auto" />
      ) : (
        products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </Row>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://fakestoreapi.com/products?limit=4");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
