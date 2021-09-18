import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_INCREMENT_ITEM,
  CART_DECREMENT_ITEM,
} from "../constants/cartConstants";

export const incrementCartItem = (product) => (dispatch, getState) => {
  dispatch({
    type: CART_INCREMENT_ITEM,
    payload: product,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const decrementCartItem = (product) => (dispatch, getState) => {
  dispatch({
    type: CART_DECREMENT_ITEM,
    payload: product,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const addToCart = (product) => async (dispatch, getState) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      price: product.price,
      qty: 1,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
