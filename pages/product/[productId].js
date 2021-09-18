import Head from "next/head";
import Link from "next/link";
import { Col, Row, Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { OPEN_CART } from "../../constants/cartConstants";

export default function ProductPage({ product }) {
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>Fake Store | {product?.title || 404}</title>
      </Head>
      <Row className="justify-content-center">
        {!product ? (
          <Alert variant="danger">404</Alert>
        ) : (
          <Row className="flex-column align-items-center">
            <Link href={`/${product.category}`}>
              <a className="mt-3">
                <i className="bi bi-arrow-left"></i> Back to {product.category}
              </a>
            </Link>
            <Col xs={10} md={6} className="mt-4 mb-3 text-center">
              <img src={product.image} alt={product.title} />
            </Col>
            <Col className="text-center" xs={12} md={6}>
              <h1>{product.title}</h1>
              <Link href={`/${product.category}`}>
                <a className="text-uppercase text-muted">{product.category}</a>
              </Link>
              <p className="description text-muted">{product.description}</p>
              <h2 className="text-bold mb-4">${product.price}</h2>
              <Button
                className="mb-3"
                onClick={() => {
                  dispatch(addToCart(product));
                  dispatch({ type: OPEN_CART });
                }}
                variant="info"
              >
                <i className="bi bi-cart4"></i> Add To Cart
              </Button>
            </Col>
          </Row>
        )}
      </Row>
    </>
  );
}

export async function getServerSideProps({ params: { productId } }) {
  const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
}
