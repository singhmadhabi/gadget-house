import "./Cart.css";
const Cart = () => {
    return (
      <>
      <div className="container px-3 my-5 clearfix">
        <div className="card">
          <div className="card-header">
            <h2>Shopping Cart</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered m-0">
                <thead>
                  <tr>
                    <th
                      className="text-center py-3 px-4"
                      style={{ minWidth: "400px" }}
                    >
                      Product Name &amp; Details
                    </th>
                    <th
                      className="text-right py-3 px-4"
                      style={{ width: "100px" }}
                    >
                      Price
                    </th>
                    <th
                      className="text-center py-3 px-4"
                      style={{ width: "120px" }}
                    >
                      Quantity
                    </th>
                    <th
                      className="text-right py-3 px-4"
                      style={{ width: "100px" }}
                    >
                      Total
                    </th>
                    <th
                      className="text-center align-middle py-3 px-0"
                      style={{ width: "40px" }}
                    >
                      <a
                        href="#"
                        className="shop-tooltip float-none text-light"
                        title=""
                        data-original-title="Clear cart"
                      >
                        <i className="ino ion-md-trash"></i>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4">
                      <div className="media align-items-center">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          className="d-block ui-w-40 ui-bordered mr-4"
                          alt=""
                        />
                        <div className="media-body">
                          <a href="#" className="d-block text-dark">
                            Product 1
                          </a>
                          <small>
                            <span className="text-muted">Color:</span>
                            <span
                              className="ui-product-color ui-product-color-sm align-text-bottom"
                              style={{ background: "#e81e2c" }}
                            ></span>{" "}
                            &nbsp;
                            <span className="text-muted">Size: </span> EU 37
                            &nbsp;
                            <span className="text-muted">
                              Ships from:{" "}
                            </span>{" "}
                            China
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      $57.55
                    </td>
                    <td className="align-middle p-4">
                      <input
                        type="text"
                        className="form-control text-center"
                        value="2"
                      />
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      $115.1
                    </td>
                    <td className="text-center align-middle px-0">
                      <a
                        href="#"
                        className="shop-tooltip close float-none text-danger"
                        title=""
                        data-original-title="Remove"
                      >
                        ×
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <div className="media align-items-center">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar6.png"
                          className="d-block ui-w-40 ui-bordered mr-4"
                          alt=""
                        />
                        <div className="media-body">
                          <a href="#" className="d-block text-dark">
                            Product 2
                          </a>
                          <small>
                            <span className="text-muted">Color:</span>
                            <span
                              className="ui-product-color ui-product-color-sm align-text-bottom"
                              style={{ background: "#000" }}
                            ></span>{" "}
                            &nbsp;
                            <span className="text-muted">Storage: </span> 32GB
                            &nbsp;
                            <span className="text-muted">Warranty: </span>{" "}
                            Standard - 1 year &nbsp;
                            <span className="text-muted">
                              Ships from:{" "}
                            </span>{" "}
                            China
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      $1049.00
                    </td>
                    <td className="align-middle p-4">
                      <input
                        type="text"
                        className="form-control text-center"
                        value="1"
                      />
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      $1049.00
                    </td>
                    <td className="text-center align-middle px-0">
                      <a
                        href="#"
                        className="shop-tooltip close float-none text-danger"
                        title=""
                        data-original-title="Remove"
                      >
                        ×
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4">
                      <div className="media align-items-center">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          className="d-block ui-w-40 ui-bordered mr-4"
                          alt=""
                        />
                        <div className="media-body">
                          <a href="#" className="d-block text-dark">
                            Product 3
                          </a>
                          <small>
                            <span className="text-muted">Ships from: </span>{" "}
                            Germany
                          </small>
                        </div>
                      </div>
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      $20.55
                    </td>
                    <td className="align-middle p-4">
                      <input
                        type="text"
                        className="form-control text-center"
                        value="1"
                      />
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      $20.55
                    </td>
                    <td className="text-center align-middle px-0">
                      <a
                        href="#"
                        className="shop-tooltip close float-none text-danger"
                        title=""
                        data-original-title="Remove"
                      >
                        ×
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="mt-4">
                <label className="text-muted font-weight-normal">
                  Promocode
                </label>
                <input type="text" placeholder="ABC" className="form-control" />
              </div>
              <div className="d-flex">
                <div className="text-right mt-4 mr-5">
                  <label className="text-muted font-weight-normal m-0">
                    Discount
                  </label>
                  <div className="text-large">
                    <strong>$20</strong>
                  </div>
                </div>
                <div className="text-right mt-4">
                  <label className="text-muted font-weight-normal m-0">
                    Total price
                  </label>
                  <div className="text-large">
                    <strong>$1164.65</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-right">
              <button
                type="button"
                className="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
              >
                Back to shopping
              </button>
              <button type="button" className="btn btn-lg btn-primary mt-2">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    );
  };
  
  export default Cart;