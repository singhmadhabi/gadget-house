import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import useUsers from "../../../hooks/useUsers";

export default function AddUser() {
  const navigate = useNavigate();
  const { create } = useUsers();

  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await create(payload);
      if (result?.msg === "success") {
        alert("User Added Successfully");
        navigate("/admin/users");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Container>
      <Row>
        <h3 className="text-center">Add new User</h3>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={payload?.name}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={payload?.email}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter secure password"
                value={payload?.password}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Roles</Form.Label>
              <Form.Select
                value={payload?.roles}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, roles: e.target.value };
                  });
                }}
              >
                <option>Open this select menu</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
            </Form.Group>
            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" className="w-50" type="submit">
                Submit
              </Button>
              <Link to="/admin/products" className="btn btn-danger">
                Go Back
              </Link>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}