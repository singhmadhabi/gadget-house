import { Link, useNavigate } from "react-router-dom";
import { Stack } from "react-bootstrap";
import { BiLogOut } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { setLogOut } from "../slices/authSlice";
import { removeToken } from "../utils/session";

function AdminNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(setLogOut());
    removeToken();
    navigate("/login");
  };
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link
            to={"/admin/dashboard"}
            className="text-dark text-decoration-none"
          >
            Gadget House Admin
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link
              to={"/admin/products"}
              className="nav-link text-dark text-decoration-none"
            >
              Products
            </Link>
            <Link
              to={"/admin/orders"}
              className="nav-link text-dark text-decoration-none"
            >
              Orders
            </Link>
            <Link
              to={"/admin/categories"}
              className="nav-link text-dark text-decoration-none"
            >
              Categories
            </Link>
            <Link
              to={"/admin/users"}
              className="nav-link text-dark text-decoration-none"
            >
              Users
            </Link>
          </Nav>
          <div className="p-1">
            <Stack gap={1} direction="horizontal">
              <div className="p-2">
                {isLoggedIn && user ? (
                  <strong>Welcome {user?.name}</strong>
                ) : null}
              </div>
              <Link className="btn btn-outline-secondary">
                <BiLogOut size={24} onClick={handleLogOut} />
              </Link>
            </Stack>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavBar;