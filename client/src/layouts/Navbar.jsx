import { Link } from "react-router-dom";
import { Badge, Button, Stack } from "react-bootstrap";

import { FaShoppingCart } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useSelector } from "react-redux";

function NavBar() {
  const { quantity } = useSelector((state) => state.cart);
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to={"/"} className="text-dark text-decoration-none">
            Gadget House
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
              <Link to={"/products"} className="nav-link text-dark text-decoration-none">
                Products
              </Link>
              <Link to={"/about"} className="nav-link text-dark text-decoration-none">
                About
              </Link>
              <Link to={"/contact"} className="nav-link text-dark text-decoration-none">
                Contact
              </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="p-1">
            <Stack gap={1} direction="horizontal">
              <Link to={"/cart"} className="btn btn-outline-secondary">
                  <FaShoppingCart />
                  &nbsp;
                  <Badge bg="primary">{quantity}</Badge>
              </Link>
              <Link to={"/login"} className="btn btn-outline-secondary">
                  <BiLogIn size={24} />
              </Link>
            </Stack>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;