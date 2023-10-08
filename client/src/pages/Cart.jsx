import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftSquare } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const totalAmount = () => {
    return cart.reduce((acc, obj) => acc + obj.quantity * obj.price, 0);
  };

  const increase = (id) => {
    if (id) dispatch(increaseQuantity(id));
  };

  const decrease = (id) => {
    if (id) dispatch(decreaseQuantity(id));
  };

  const removeFromCart = (id) => {
    if (id) {
      dispatch(removeItem(id));
    }
  };

  return (
    <>
      {cart.length > 0 ? (
        <FullCart
          items={cart}
          decrease={decrease}
          increase={increase}
          removeFromCart={removeFromCart}
          totalAmount={totalAmount}
        />
      ) : (
        <EmptyCart />
      )}
    </>
  );
  };

  const EmptyCart = () => {
    return (
      <>
        <div className="p-5 mb-4 bg-body-tertiary rounded-3 text-center">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Your cart is empty</h1>
            <Link to="/products" className="btn btn-light btn-lg">
              <BsArrowLeftSquare size={24} />
              &nbsp; Continue Shopping
              </Link>
          </div>
        </div>
      </>
    );
  };
  
  const FullCart = ({ 
    decrease,
    increase,
    items,
    removeFromCart,
    totalAmount, 
  }) => {
    return (
      <>
        <h1 className="text-center m-5">Your Cart</h1>
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>name</td>
                      <td>
                        <Image
                          width={40}
                          height={40}
                          src={item?.image || "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80"}
                          thumbnail
                        />
                      </td>
                      <td>{item?.price}</td>
                      <td>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                          onClick={() => decrease(item?.id)}
                        >
                          -
                        </span>
                        <span className="btn btn-info">{item?.quantity}</span>
                        <span
                          className="btn btn-primary"
                          style={{ margin: "2px" }}
                          onClick={() => increase(item?.id)}
                        >
                          +
                        </span>
                      </td>
                      <td>{Number(item?.price) * Number(item?.quantity)}</td>
                      <td>
                        <AiFillCloseCircle color="red" size={24} onClick={() => {
                          removeFromCart(item?.id);
                        }} />
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td colSpan="5">Total Carts</td>
                  <td>Total Amount</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  
  export default Cart;