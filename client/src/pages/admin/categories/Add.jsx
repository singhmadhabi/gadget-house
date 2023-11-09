import { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import useCategories from "../../../hooks/useCategories";

export default function AddCategory() {
  const navigate = useNavigate();
  const { create } = useCategories();

  const [payload, setPayload] = useState({
    name: "",
    alias: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { alias, ...rest } = payload;
      rest.alias = alias.split(",");
      const result = await create(rest);
      if (result?.msg === "success") {
        alert("Category Added Successfully");
        navigate("/admin/categories");
      }
    } catch (e) {
      alert(e);
    } finally {
      setPayload({
        name: "",
        alias: "",
      });
    }
  };

  return (
    <Container>
      <Row>
        <h3 className="text-center">Add new Category</h3>
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
              <Form.Label>Alias</Form.Label>
              <Form.Control
                type="text"
                placeholder="Separate them by comma"
                value={payload?.description}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, alias: e.target.value };
                  });
                }}
              />
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