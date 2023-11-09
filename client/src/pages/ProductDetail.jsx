import "./ProductDetail.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../constants";

import { fetchProducts, getProductById } from "../slices/productSlice";
import { updateCart } from "../slices/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [randomProducts, setRandomProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const productInfo = useCallback(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const allProducts = useCallback(() => {
    dispatch(fetchProducts({ limit: 25, page: 1 }));
  }, [dispatch]);

  const fourRandomProducts = useCallback(() => {
    if (products.length > 1) {
      const random1 = products[Math.floor(Math.random() * products.length)];
      const random2 = products[Math.floor(Math.random() * products.length)];
      const random3 = products[Math.floor(Math.random() * products.length)];
      const random4 = products[Math.floor(Math.random() * products.length)];
      setRandomProducts([random1, random2, random3, random4]);
    }
  }, [products]);

  const shopNow = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    productInfo();
    if (products.length < 1) allProducts();
    fourRandomProducts();
  }, [productInfo, allProducts, products, fourRandomProducts]);

  return (
    <section className="">
      <div className="container flex mt-2 d-flex justify-content-center">
        <div className="col-lg-8 border p-2 bg-white">
          <div className="row hedding m-0 pl-3 pt-0 pb-3">
            {product?.quantity < 1 && (
              <div className="text-danger">Out of Stock</div>
            )}
          </div>
          <div className="row m-0">
            <div className="col-lg-4 left-side-product-box pb-3">
              {product?.images && product?.images.length > 0 ? (
                <img
                  src={BASE_URL.concat("/", product?.images[0])}
                  className="border p-3"
                />
              ) : null}
              <span className="sub-img">
                {product?.images &&
                  product?.images.slice(1).map((image, index) => {
                    return (
                      <img
                        key={index}
                        src={BASE_URL.concat("/", image)}
                        className="border p-2"
                      />
                    );
                  })}
              </span>
            </div>
            <div className="col-lg-8">
              <div className="right-side-pro-detail border p-3 m-0">
                <div className="row">
                  <div className="col-lg-12">
                    <span>Product Info</span>
                    <p className="m-0 p-0">{product?.name}</p>
                  </div>
                  <div className="col-lg-12">
                    <p className="m-0 p-0 price-pro">NPR {product?.price}</p>
                    <hr className="p-0 m-0" />
                  </div>
                  <div className="col-lg-12 pt-2">
                    <h5>Product Detail</h5>
                    <span>{product?.description}</span>
                    <hr className="m-0 pt-2 mt-2" />
                  </div>
                  <div className="col-lg-12">
                    <p className="tag-section">
                      <strong>Tag : </strong>
                      {product?.category_name}
                    </p>
                  </div>
                  <div className="col-lg-12">
                    <h6>Quantity :</h6>
                    <input
                      type="number"
                      className="form-control text-center w-100"
                      value={quantity}
                      min={"1"}
                      max={product?.quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      disabled={product?.quantity < 1 ? true : false}
                    />
                  </div>
                  <div className="col-lg-12 mt-3">
                    <div className="row">
                      <div className="col-lg-6 pb-2">
                        <button
                          href="#"
                          className="btn btn-danger w-100"
                          disabled={product?.quantity < 1 ? true : false}
                          onClick={() => {
                            dispatch(updateCart({ product, quantity }));
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div className="col-lg-6">
                        <button
                          href="#"
                          className="btn btn-success w-100"
                          disabled={product?.quantity < 1 ? true : false}
                          onClick={() => {
                            shopNow();
                          }}
                        >
                          Shop Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 text-center pt-3">
              <h4>More Product</h4>
            </div>
          </div>
          <div className="row mt-3 p-0 text-center pro-box-section">
            {randomProducts && randomProducts.length > 0
              ? randomProducts.map((product, index) => {
                  return (
                    <div key={index} className="col-lg-3 pb-2">
                      <Link to={`/products/${product?._id}`}>
                        <div className="pro-box border p-0 m-0">
                          <img
                            src={
                              product?.images && product?.images.length > 0
                                ? BASE_URL.concat("/", product?.images[0])
                                : ""
                            }
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;