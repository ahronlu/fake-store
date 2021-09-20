import Head from "next/head";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "../reducers/cartReducers";
import { CartModal, Header } from "../components";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

const reducer = combineReducers({
  cart: cartReducer,
});

const ISSERVER = typeof window === "undefined";
let cartItemsFromStorage = [];

if (!ISSERVER) {
  cartItemsFromStorage = window.localStorage.getItem("cartItems")
    ? JSON.parse(window.localStorage.getItem("cartItems"))
    : [];
}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Fake Store</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <CartModal />
    </Provider>
  );
}

export default MyApp;
