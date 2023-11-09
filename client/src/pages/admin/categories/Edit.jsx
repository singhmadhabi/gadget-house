import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import useCategories from "../../../hooks/useCategories";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, getById, update } = useCategories();

  const [payload, setPayload] = useState({
    name: "",
    alias: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await update(id, payload);
      if (result?.msg === "success") {
        alert("Category Updated Successfully");
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

  const fetchDetail = useCallback(async () => {
    try {
      const data = await getById(id);
      if (data) {
        const {
          isArchived,
          created_at,
          updated_at,
          created_by,
          updated_by,
          ...rest
        } = data;
        const { alias, ...cat } = rest;
        cat.alias = alias.toString();
        setPayload((prev) => {
          return { ...prev, ...cat };
        });
      }
    } catch (e) {
      alert(e);
    }
  }, [id, getById]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return (
    <Container>
      <Row>
        <h3 className="text-center">Update Category</h3>
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
                value={payload?.alias}
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
              <Link to="/admin/categories" className="btn btn-danger">
                Go Back
              </Link>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}