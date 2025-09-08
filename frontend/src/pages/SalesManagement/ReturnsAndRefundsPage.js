import React, { useState, useEffect } from "react";
import axios from "axios";

const ReturnsAndRefundsPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [csvFile, setCsvFile] = useState(null);

  const baseURL = `${process.env.REACT_APP_API_BASE_URL}/api/returns-and-refunds`;

  // Fetch all orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handlePrintInvoice = () => {
    if (!selectedOrder) {
      alert("No order selected");
      return;
    }
    window.print(); // Native print
  };

  const handleSendEmail = async () => {
    if (!selectedOrder) return alert("No order selected");
    alert("Email sent for Order ID: " + selectedOrder.orderId);
  };
  // Trigger Return
  const handleReturn = async () => {
    if (!selectedOrder) return alert("Select an order to return.");

    try {
      const res = await axios.put(
        `${baseURL}/return/${selectedOrder._id}`,
        { status: "Returned" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Return processed.");
      fetchOrders();
    } catch (error) {
      console.error("Return failed:", error.message);
      alert("Failed to process return.");
    }
  };

  // Trigger Exchange
  const handleExchange = async () => {
    if (!selectedOrder) return alert("Select an order to exchange.");

    try {
      const res = await axios.put(
        `${baseURL}/exchange/${selectedOrder._id}`,
        { status: "Exchanged" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Exchange successful.");
      fetchOrders();
    } catch (error) {
      console.error("Exchange failed:", error.message);
      alert("Failed to process exchange.");
    }
  };
  const openEditModal = (order) => {
    setEditData({ ...order });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`${baseURL}/${editData._id}`, editData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Order updated successfully.");
      setShowEditModal(false);
      fetchOrders();
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("Update failed.");
    }
  };

  const openDeleteModal = (order) => {
    setEditData(order);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${baseURL}/${editData._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Order deleted.");
      setShowDeleteModal(false);
      fetchOrders();
    } catch (error) {
      console.error("Delete failed:", error.message);
      alert("Delete failed.");
    }
  };
  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith(".csv")) {
      alert("Please upload a valid .csv file.");
      return;
    }
    setCsvFile(file);
  };

  // Trigger Refund Receipt Generation
  const handleRefundReceipt = async () => {
    if (!selectedOrder) return alert("Select an order for refund.");

    try {
      const res = await axios.post(
        `${baseURL}/refund-receipt`,
        {
          orderId: selectedOrder.orderId,
          customer: selectedOrder.customer,
          refundAmount: selectedOrder.orderTotal,
          refundDate: new Date(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Refund receipt generated.");
    } catch (error) {
      console.error("Refund receipt failed:", error.message);
      alert("Failed to generate refund receipt.");
    }
  };

  {
    showDeleteModal && (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
              />
            </div>
            <div className="modal-body">
              Are you sure you want to delete order{" "}
              <strong>{editData?.orderId}</strong>?
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  const parseCsvAndUpload = () => {
    if (!csvFile) return alert("Upload a CSV first");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const lines = e.target.result.split("\n").slice(1); // Skip header
      const parsedData = lines.map((line) => {
        const [orderId, orderDate, orderTotal, channel, orderStatus] =
          line.split(",");

        return {
          orderId: orderId?.trim(),
          orderDate: new Date(orderDate.trim()),
          orderTotal: parseFloat(orderTotal.trim()),
          channel: channel?.trim(),
          orderStatus: orderStatus?.trim(),
        };
      });

      try {
        await axios.post(`${baseURL}/bulk`, parsedData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("Bulk import successful.");
        fetchOrders();
      } catch (error) {
        console.error("CSV import error:", error.message);
        alert("Import failed.");
      }
    };
    reader.readAsText(csvFile);
  };
  const exportToCSV = () => {
    const csvRows = [];

    const headers = [
      "Order ID",
      "Order Date",
      "Order Total",
      "Channel",
      "Order Status",
    ];
    csvRows.push(headers.join(","));

    orders.forEach((order) => {
      const row = [
        order.orderId,
        new Date(order.orderDate).toLocaleDateString(),
        order.orderTotal.toFixed(2),
        order.channel,
        order.orderStatus,
      ];
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "returns_and_refunds.csv";
    a.click();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Returns & Refunds</h2>
      <button className="btn btn-success mb-3" onClick={exportToCSV}>
        Export CSV
      </button>
      <div className="mb-3">
        <input
          type="file"
          accept=".csv"
          onChange={handleCsvUpload}
          className="form-control w-50 d-inline"
        />
        <button className="btn btn-primary ms-2" onClick={parseCsvAndUpload}>
          Import CSV
        </button>
      </div>

      {/* Order List */}
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Channel</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className={
                    selectedOrder?._id === order._id ? "table-primary" : ""
                  }
                  onClick={() => handleOrderClick(order)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{order.orderId}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>₹{order.orderTotal.toFixed(2)}</td>
                  <td>{order.channel}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <button
        className="btn btn-sm btn-outline-primary me-1"
        onClick={() => openEditModal(selectedOrder)}
        disabled={!selectedOrder}
      >
        Edit
      </button>
      <button
        className="btn btn-sm btn-outline-danger"
        onClick={() => openDeleteModal(selectedOrder)}
        disabled={!selectedOrder}
      >
        Delete
      </button>

      {/* Action Buttons */}
      <div className="mt-3">
        <button
          className="btn btn-success me-2"
          onClick={handlePrintInvoice}
          disabled={!selectedOrder}
        >
          Print Invoice
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={handleSendEmail}
          disabled={!selectedOrder}
        >
          Send Email
        </button>
        <button
          className="btn btn-warning me-2"
          onClick={handleReturn}
          disabled={!selectedOrder}
        >
          Return
        </button>
        <button
          className="btn btn-info me-2"
          onClick={handleExchange}
          disabled={!selectedOrder}
        >
          Exchange
        </button>
        <button
          className="btn btn-danger"
          onClick={handleRefundReceipt}
          disabled={!selectedOrder}
        >
          Generate Refund Receipt
        </button>
      </div>
      {showEditModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Return/Refund</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                />
              </div>
              <div className="modal-body">
                <input
                  name="orderId"
                  value={editData?.orderId || ""}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                  placeholder="Order ID"
                />
                <input
                  name="channel"
                  value={editData?.channel || ""}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                  placeholder="Channel"
                />
                <input
                  name="orderTotal"
                  type="number"
                  value={editData?.orderTotal || ""}
                  onChange={handleEditChange}
                  className="form-control mb-2"
                  placeholder="Order Total"
                />
                <select
                  name="orderStatus"
                  value={editData?.orderStatus || ""}
                  onChange={handleEditChange}
                  className="form-control"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Returned">Returned</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleEditSubmit}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
              <div className="modal-body">
                Are you sure you want to delete order{" "}
                <strong>{editData?.orderId}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnsAndRefundsPage;
