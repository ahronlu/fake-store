import Link from "next/link";
import { useDispatch } from "react-redux";
import { Col, Button } from "react-bootstrap";
import { addToCart } from "../actions/cartActions";
import { OPEN_CART } from "../constants/cartConstants";

export const ProductCard = ({ product }) => {
  const { image, title, description, price, category, id } = product;

  const dispatch = useDispatch();

  return (
    <Col
      className="d-flex flex-column align-items-center text-center mb-5"
      xs={12}
      md={3}
    >
      <img
        src={image}
        alt={title}
        height="200px"
        width="auto"
        style={{ width: "auto" }}
      />
      <Link href={`/${category}`}>
        <a className="text-capitalize">{category}</a>
      </Link>
      <Link href={`/product/${id}`}>
        <a>
          <h2>{title.slice(0, 25)}</h2>
        </a>
      </Link>
      <p className="description">{description.slice(0, 100)}...</p>
      <p>${price}</p>
      <Button
        variant="info"
        onClick={() => {
          dispatch(addToCart(product));
          dispatch({ type: OPEN_CART });
        }}
      >
        <i className="bi bi-cart4"></i> Add To Cart
      </Button>
    </Col>
  );
};
