import React, { useState, useEffect } from "react";
import axios from "axios";

const PayrollManagementPage = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [formData, setFormData] = useState({
    employeeName: "",
    salary: "",
    benefits: "",
    deductions: "",
  });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token"); // 🔐 JWT

  const API = `${process.env.REACT_APP_API_BASE_URL}/api/payrolls`;

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayrolls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeName, salary, benefits = 0, deductions = 0 } = formData;
    const netPay =
      parseFloat(salary) + parseFloat(benefits) - parseFloat(deductions);

    try {
      if (editingId) {
        await axios.put(
          `${API}/${editingId}`,
          {
            employeeName,
            salary,
            benefits,
            deductions,
            netPay,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          API,
          {
            employeeName,
            salary,
            benefits,
            deductions,
            netPay,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      fetchPayrolls();
      setFormData({
        employeeName: "",
        salary: "",
        benefits: "",
        deductions: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      employeeName: item.employeeName,
      salary: item.salary,
      benefits: item.benefits,
      deductions: item.deductions,
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPayrolls();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Payroll Management</h3>

      <form
        onSubmit={handleSubmit}
        className="mb-4 border p-3 rounded bg-light"
      >
        <div className="row mb-2">
          <div className="col">
            <input
              type="text"
              name="employeeName"
              placeholder="Employee Name"
              value={formData.employeeName}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              step="0.01"
              name="salary"
              placeholder="Salary"
              value={formData.salary}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <input
              type="number"
              step="0.01"
              name="benefits"
              placeholder="Benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              type="number"
              step="0.01"
              name="deductions"
              placeholder="Deductions"
              value={formData.deductions}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-secondary">
          <tr>
            <th>Employee Name</th>
            <th>Salary</th>
            <th>Benefits</th>
            <th>Deductions</th>
            <th>Net Pay</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((item) => (
            <tr key={item._id}>
              <td>{item.employeeName}</td>
              <td>${item.salary.toFixed(2)}</td>
              <td>${item.benefits.toFixed(2)}</td>
              <td>${item.deductions.toFixed(2)}</td>
              <td>
                <strong>${item.netPay.toFixed(2)}</strong>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {payrolls.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No payroll records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollManagementPage;
