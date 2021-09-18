import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
} from "../actions/cartActions";
// import PaypalButton from "../components/PaypalButton";
import { CLEAR_CART } from "../constants/cartConstants";

export default function CheckoutPage({ history }) {
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const { cartItems } = useSelector((state) => state.cart);

  const cartTotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <>
      <h1 className="text-uppercase my-5 text-center">
        Order <span className="text-info">Summary</span>
      </h1>
      {cartItems.length ? (
        cartItems?.map((item) => (
          <>
            <Row className="align-items-center mb-5 text-center">
              <Col xs={3}>
                <img src={item.image} alt={item.title} height="100" />
              </Col>
              <Col xs={6}>
                <h2>{item.title}</h2>
                <h3>${item.price}</h3>
              </Col>
              <Col xs={3}>
                <i
                  className="bi bi-dash"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    item.qty === 1
                      ? dispatch(removeFromCart(item.product))
                      : dispatch(decrementCartItem(item));
                  }}
                ></i>
                <span>{item.qty}</span>
                <i
                  className="bi bi-plus"
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(incrementCartItem(item))}
                ></i>
                <h3>${item.qty * item.price}</h3>
              </Col>
            </Row>
            <Row>
              <Col className="text-center" xs={12}>
                <h2>
                  <b className="text-info">Total:</b> ${cartTotal}
                </h2>
                {/* <PaypalButton
                  total={cartTotal}
                  clearCart={clearCart}
                  history={history}
                /> */}
              </Col>
            </Row>
          </>
        ))
      ) : (
        <h2>Your cart is empty</h2>
      )}
    </>
  );
}
