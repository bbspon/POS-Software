import React, { useState, useEffect } from "react";
import axios from "axios";

const AuditReportsPage = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/audit-reports`;
  const token = localStorage.getItem("token"); // assuming JWT token stored here

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(BASE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this log?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLogs();
    } catch (err) {
      console.error("Failed to delete log:", err);
    }
  };

  const handleExport = () => {
    const csv = logs.map(
      (log) =>
        `${log.user},${log.action},${log.module},${log.description},${new Date(
          log.timestamp
        ).toLocaleString()},${log.ipAddress}`
    );
    const blob = new Blob(
      [
        `User,Action,Module,Description,Timestamp,IP Address\n${csv.join(
          "\n"
        )}`,
      ],
      { type: "text/csv" }
    );
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_logs.csv";
    a.click();
  };

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Audit Reports</h2>

      <input
        type="text"
        placeholder="Search by user, action, or module..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="table table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Module</th>
            <th>Description</th>
            <th>Timestamp</th>
            <th>IP Address</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <tr key={log._id}>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.module}</td>
                <td>{log.description}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{log.ipAddress}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => alert(JSON.stringify(log, null, 2))}
                  >
                    View
                  </button>{" "}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(log._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No logs found</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn btn-success" onClick={handleExport}>
        Export Logs
      </button>
    </div>
  );
};

export default AuditReportsPage;
