import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { OPEN_CART } from "../constants/cartConstants";

export const Header = () => {
  const router = useRouter();

  console.log(router.asPath);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const links = [
    "home",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  return (
    <header className="border-bottom border-light">
      <Navbar bg="white" expand="lg">
        <Container>
          <Link className="d-flex align-items-center" href="/">
            <a>
              <img
                width="50px"
                height="50px"
                className="img-responsive"
                src="/logo192.png"
                alt="logo"
              />
            </a>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-3" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {links.map((link) => (
                <Link key={link} href={`/${link === "home" ? "" : link}`}>
                  <a
                    className={`text-capitalize mx-3 ${
                      router.asPath === "/" + link.replace(" ", "%20")
                        ? "text-info"
                        : ""
                    }`}
                  >
                    {link}
                  </a>
                </Link>
              ))}
            </Nav>
          </Navbar.Collapse>
          <Button
            variant="white"
            onClick={() => dispatch({ type: OPEN_CART })}
            className="mb-0 mx-3 p-0 order-2"
          >
            Cart(
            {cartItems.reduce((acc, item) => acc + item?.qty || 0, 0)})
          </Button>
        </Container>
      </Navbar>
    </header>
  );
};
