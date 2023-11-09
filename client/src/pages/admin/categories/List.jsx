import { useCallback, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import useCategories from "../../../hooks/useCategories";

export default function ListCategory() {
  const navigate = useNavigate();
  const { data, list, remove } = useCategories();

  const fetchCategory = useCallback(async () => {
    await list();
  }, [list]);

  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const resp = await remove(id);
        if (resp.msg === "success") {
          Swal.fire({
            title: "Deleted!",
            text: "Data deleted successfully",
            icon: "success",
          });
        }
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);
  return (
    <div>
      <h1 className="text-center">Categories</h1>
      <div className="d-flex mb-2 flex-row-reverse">
        <Link to="/admin/categories/add" className="btn btn-danger">
          Add new Category
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((cat, idx) => {
              return (
                <tr key={cat?._id}>
                  <td>{idx + 1}</td>
                  <td>{cat?.name}</td>
                  <td>{cat?.slug}</td>
                  <td className="text-center">
                    <FaEdit
                      onClick={() => {
                        navigate(`/admin/categories/${cat?._id}`);
                      }}
                    />
                    <FaTrashAlt
                      color="red"
                      onClick={() => handleRemove(cat?._id)}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4}>No Categories Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}