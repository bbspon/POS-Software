import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerLoyaltyPage = () => {
  const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api/customer-loyalty`;

  const [loyaltyList, setLoyaltyList] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch Loyalty Customers
  const fetchLoyaltyData = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setLoyaltyList(res.data);
    } catch (err) {
      console.error("Failed to fetch loyalty customers:", err);
    }
  };

  useEffect(() => {
    fetchLoyaltyData();
  }, []);

  // Filter & Sort Logic
  const filteredData = loyaltyList
    .filter((item) => {
      const nameMatch = (item.name?.toLowerCase() || "").includes(
        search.toLowerCase()
      );
      const tagMatch = filterTag === "All" || item.tag === filterTag;
      return nameMatch && tagMatch;
    })
    .sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });

  return (
    <div className="container mt-4">
      <h3>Customer Loyalty List</h3>
      <div className="d-flex gap-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="form-select"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        >
          <option value="All">All Tags</option>
          <option value="vip">VIP</option>
          <option value="regular">Regular</option>
          <option value="new">New</option>
        </select>
        <select
          className="form-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending ↑</option>
          <option value="desc">Descending ↓</option>
        </select>
      </div>

      {filteredData.length > 0 ? (
        <ul className="list-group">
          {filteredData.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                {item.name} (ID: {item.customerId})
              </span>
              <span className="badge bg-secondary">{item.tag}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No customer loyalty data found.</p>
      )}
    </div>
  );
};

export default CustomerLoyaltyPage;
