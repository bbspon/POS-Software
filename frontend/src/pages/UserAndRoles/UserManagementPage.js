import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "staff",
    status: "active",
  });
  const [editId, setEditId] = useState(null);
  const [token, setToken] = useState(""); // Replace with actual token logic
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;
  const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/users`;

  useEffect(() => {
    loadUsers();
  }, [page]);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${token}` },
  });

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}?page=${page}&limit=${limit}`,
        authHeader()
      );

      // Accept either `{ users: [...] }`  OR  `[ ... ]`
      const list = Array.isArray(res.data) ? res.data : res.data.users;

      setUsers(list || []); // always an array
    } catch (err) {
      console.error(err);
      setUsers([]); // keep state valid on error
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_BASE}/${editId}`, form, authHeader());
      } else {
        await axios.post(API_BASE, form, authHeader());
      }
      setForm({ name: "", email: "", role: "staff", status: "active" });
      setEditId(null);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`, authHeader());
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post(
        `${API_BASE}/bulk-delete`,
        { ids: selected },
        authHeader()
      );
      setSelected([]);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExport = async () => {
    try {
      const res = await axios.get(`${API_BASE}/export`, {
        ...authHeader(),
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="form-control mb-2"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-2"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="staff">Staff</option>
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="btn btn-primary">
          {editId ? "Update" : "Create"}
        </button>
      </form>

      <button
        className="btn btn-danger mb-3"
        onClick={handleBulkDelete}
        disabled={!selected.length}
      >
        Bulk Delete
      </button>
      <button className="btn btn-success mb-3 ml-2" onClick={handleExport}>
        Export CSV
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  setSelected(e.target.checked ? users.map((u) => u._id) : []);
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(user._id)}
                  onChange={(e) => {
                    setSelected((prev) =>
                      e.target.checked
                        ? [...prev, user._id]
                        : prev.filter((id) => id !== user._id)
                    );
                  }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger ml-2"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="btn btn-secondary mr-2"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-secondary ml-2"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagementPage;
