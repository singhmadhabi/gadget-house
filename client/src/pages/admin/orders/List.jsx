import { useCallback, useEffect } from "react";
import { FaEdit, FaStamp, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import useOrders from "../../../hooks/useOrders";

export default function ListOrders() {
  const navigate = useNavigate();
  const { data, approve, list, remove } = useOrders();

  const fetchOrder = useCallback(async () => {
    await list();
  }, [list]);

  const handleRemove = async (id, status) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${status ? "Unarchive" : "Archive"} it!`,
      });
      if (result.isConfirmed) {
        const resp = await remove(id);
        if (resp.msg === "success") {
          Swal.fire({
            title: "Updated!",
            text: `Data ${status ? "unarchived" : "archived"} successfully`,
            icon: "success",
          });
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleApprove = async (id, status) => {
    try {
      const payload =
        status === "pending" ? { status: "completed" } : { status: "pending" };
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, Do it!`,
      });
      if (result.isConfirmed) {
        const resp = await approve(id, payload);
        if (resp.msg === "success") {
          Swal.fire({
            title: "Updated!",
            text: `Data Approved successfully`,
            icon: "success",
          });
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  return (
    <div>
      <h1 className="text-center">Orders</h1>
      <div className="d-flex mb-2 flex-row-reverse">
        <Link to="/admin/orders/add" className="btn btn-danger">
          Add new Order
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Order Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((order) => {
              return (
                <tr key={order?._id}>
                  <td>{order?.id}</td>
                  <td>{order?.name}</td>
                  <td>{order?.email}</td>
                  <td>{moment(order?.orderDate).format("lll")}</td>
                  <td>{order?.total}</td>
                  <td>{order?.status}</td>
                  <td className="text-center">
                    <FaEdit
                      className="m-2"
                      onClick={() => {
                        navigate(`/admin/orders/${order?._id}`);
                      }}
                    />
                    <FaTrashAlt
                      className="m-2"
                      color="red"
                      onClick={() => handleRemove(order?.id, order?.isArchived)}
                    />
                    <FaStamp
                      color="green"
                      className="m-2"
                      onClick={() => handleApprove(order?.id, order?.status)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>No Orders Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}