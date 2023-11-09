import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import useCategories from "../../../hooks/useCategories";
import useProduct from "../../../hooks/useProduct";

export default function AddProduct() {
  const navigate = useNavigate();
  const { data, list } = useCategories();
  const { create } = useProduct();

  const [payload, setPayload] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    sku: "",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFiles = (event) => {
    event.preventDefault();
    if (event.target.files) {
      if (event.target.files.length > 4) alert("You can upload only 4 images");
      else {
        setImages([...event.target.files]);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      console.log(images);
      images.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("images", images);
      formData.append("name", payload?.name);
      formData.append("description", payload?.description);
      formData.append("quantity", payload?.quantity);
      formData.append("price", payload?.price);
      formData.append("brand", payload?.brand);
      formData.append("sku", payload?.sku);
      formData.append("category", payload?.category);
      const result = await create(formData);
      if (result?.msg === "success") {
        alert("Product Added Successfully");
        navigate("/admin/products");
      }
    } catch (e) {
      alert(e);
    } finally {
      setPayload({
        name: "",
        description: "",
        price: "",
        quantity: "",
        brand: "",
        sku: "",
        category: "",
      });
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      await list();
    } catch (e) {
      alert(e);
    }
  }, [list]);

  useEffect(() => {
    setPreviews([]);
    if (!images) {
      return;
    }
    images &&
      images.length > 0 &&
      images.map((file) => {
        const objectUrl = URL.createObjectURL(file);
        setPreviews((prev) => {
          return [...prev, objectUrl];
        });
      });
  }, [images]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Upload Images (Max upto 4)</Form.Label>
              <Form.Control type="file" multiple onChange={handleFiles} />
            </Form.Group>
            <Form.Group className="mb-3">
              {previews && previews.length > 0
                ? previews.map((preview, idx) => (
                    <img key={idx} width="100" height="100" src={preview} />
                  ))
                : null}
            </Form.Group>
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
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={payload?.description}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, description: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                max="100"
                min="1"
                value={payload?.quantity}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, quantity: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                max="1000000"
                min="1"
                value={payload?.price}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, price: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={payload?.brand}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, brand: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>SKU</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={payload?.sku}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, sku: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={payload?.category}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, category: e.target.value };
                  });
                }}
              >
                <option>Open this select menu</option>
                {data && data.length > 0
                  ? data.map((itm) => {
                      return (
                        <option key={itm?._id} value={itm?._id}>
                          {itm?.name}
                        </option>
                      );
                    })
                  : null}
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