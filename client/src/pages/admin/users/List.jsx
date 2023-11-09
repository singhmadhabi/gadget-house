import { useCallback, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import useUsers from "../../../hooks/useUsers";

export default function ListUsers() {
  const navigate = useNavigate();
  const { data, block, list, remove } = useUsers();

  const fetchUser = useCallback(async () => {
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
        const resp = await remove(id, { isArchived: !status });
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

  const handleBlock = async (id, status) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${status ? "Block" : "Unblock"} it!`,
      });
      if (result.isConfirmed) {
        const resp = await block(id, { isActive: !status });
        if (resp.msg === "success") {
          Swal.fire({
            title: "Updated!",
            text: `Data ${status ? "blocked" : "unblocked"} successfully`,
            icon: "success",
          });
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <div>
      <h1 className="text-center">Users</h1>
      <div className="d-flex mb-2 flex-row-reverse">
        <Link to="/admin/users/add" className="btn btn-danger">
          Add new User
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Is Active?</th>
            <th>Is Archive?</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((user, idx) => {
              return (
                <tr key={user?._id}>
                  <td>{idx + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.roles.toString()}</td>
                  <td>{user?.isActive ? "Yes" : "No"}</td>
                  <td>{user?.isArchived ? "Yes" : "No"}</td>
                  <td className="text-center">
                    <FaEdit
                      className="m-2"
                      onClick={() => {
                        navigate(`/admin/users/${user?._id}`);
                      }}
                    />
                    <FaTrashAlt
                      className="m-2"
                      color="red"
                      onClick={() => handleRemove(user?._id, user?.isArchived)}
                    />
                    <ImBlocked
                      className="m-2"
                      onClick={() => handleBlock(user?._id, user?.isActive)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>No Users Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}