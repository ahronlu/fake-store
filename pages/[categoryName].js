import Head from "next/head";
import { Row, Spinner, Alert } from "react-bootstrap";
import { ProductCard } from "../components";

export default function CategoryPage({ products, categoryName }) {
  return (
    <>
      <Head>
        <title>Fake Store | {categoryName.toUpperCase()}</title>
      </Head>
      <Row>
        <h1 className="text-center text-capitalize my-5">{categoryName}</h1>
        {!products?.length ? (
          <Alert variant="danger">404</Alert>
        ) : (
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Row>
    </>
  );
}

export async function getServerSideProps({ params: { categoryName } }) {
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${categoryName}`
  );
  const products = await res.json();

  return {
    props: {
      categoryName,
      products,
    },
  };
}
