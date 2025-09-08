import React, { useState } from "react";
import { Container, Row, Col, Card, Dropdown, Form } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const [sellingOptions, setSellingOptions] = useState([]);
  const [purchaseOptions, setPurchaseOptions] = useState([]);
  const [saleOptions, setSaleOptions] = useState([]);
  const [saleOrderOptions, setSaleOrderOptions] = useState([]);

  const handleSellingOptionChange = (event) => {
    setSellingOptions(event.target.value);
  };

  const handlePurchaseOptionChange = (event) => {
    setPurchaseOptions(event.target.value);
  };

  const handleSaleOptionChange = (event) => {
    setSaleOptions(event.target.value);
  };

  const handleSaleOrderOptionChange = (event) => {
    setSaleOrderOptions(event.target.value);
  };
  const salesData = [
    { date: "01 Jun", value: 0 },
    { date: "03 Jun", value: 0 },
    { date: "05 Jun", value: 0 },
    { date: "07 Jun", value: 0 },
    { date: "09 Jun", value: 0 },
    { date: "11 Jun", value: 0 },
    { date: "13 Jun", value: 0 },
    { date: "15 Jun", value: 0 },
    { date: "17 Jun", value: 0 },
    { date: "19 Jun", value: 0 },
    { date: "21 Jun", value: 0 },
    { date: "23 Jun", value: 0 },
    { date: "25 Jun", value: 0 },
    { date: "27 Jun", value: 0 },
    { date: "29 Jun", value: 0 },
  ];

  return (
    <>
      <div className="d-flex flex-row vh-100 bg-light">
        <Sidebar />
        <div
          className="flex-grow-1 p-3 p-md-4"
          style={{ overflowY: "auto", marginTop: "5rem", marginBottom: "5rem" }}
        >
          <Container fluid className="p-4 bg-light">
            {/* Top Row */}
            <Row className="mb-4">
              <Col md={8}>
                <Card className="mb-3  ">
                  <Card.Header className="bg-danger text-white">
                    <b>Sales Activity</b>
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-around text-center">
                    {[
                      {
                        label: "TO BE PACKED",
                        qty: 0,
                        unit: "Qty",
                        color: "text-primary",
                      },
                      {
                        label: "TO BE SHIPPED",
                        qty: 0,
                        unit: "Pkgs",
                        color: "text-danger",
                      },
                      {
                        label: "TO BE DELIVERED",
                        qty: 0,
                        unit: "Pkgs",
                        color: "text-success",
                      },
                      {
                        label: "TO BE INVOICED",
                        qty: 0,
                        unit: "Qty",
                        color: "text-warning",
                      },
                    ].map((item, idx, arr) => (
                      <div
                        key={idx}
                        className={`pe-3 ${
                          idx !== arr.length - 1 ? "border-end" : ""
                        }`}
                      >
                        <h4 className={item.color}>{item.qty}</h4>
                        <p className="mb-0">{item.unit}</p>
                        <small className="text-muted">{item.label}</small>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-3">
                  <Card.Header>
                    <b>Inventory Summary</b>
                  </Card.Header>
                  <Card.Body>
                    <p
                      className="mb-2 "
                      style={{
                        borderBottom: "1px solid #ccc",
                        paddingBottom: "10px",
                      }}
                    >
                      QUANTITY IN HAND{" "}
                      <span className="float-end fw-bold">0</span>
                    </p>
                    <p>
                      QUANTITY TO BE RECEIVED{" "}
                      <span className="float-end fw-bold">0</span>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Second Row */}
            <Row className="mb-4">
              <Col md={4}>
                <Card className="mb-3  h-100">
                  <Card.Header>
                    <b>Item Details</b>
                  </Card.Header>
                  <Card.Body className="">
                    <Row>
                      <Col sm={6}>
                        <p className="mb-2">
                          Low Stock Items{" "}
                          <span className="float-end fw-bold">0</span>
                        </p>
                        <p>
                          All Item Groups{" "}
                          <span className="float-end fw-bold">0</span>
                        </p>
                        <p>
                          All Items <span className="float-end fw-bold">0</span>
                        </p>
                      </Col>
                      <Col
                        sm={6}
                        className="d-flex align-items-center justify-content-center"
                      >
                        <div className="text-center">
                          <div className="rounded-circle w-60 h-100 border p-4 text-muted bg-warning">
                            No Active Items
                          </div>
                          <p className="mt-2">Active Items</p>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-3 h-100">
                  <Card.Header className="d-flex justify-content-between align-items-center  ">
                    <b>Top Selling Items</b>
                    <Dropdown
                      variant="light"
                      size="sm"
                      onClick={handleSellingOptionChange}
                    >
                      {sellingOptions && (
                        <Form.Select
                          className=" border-0 text-muted color-none py-1 px-3 "
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            hover: "none",
                          }}
                        >
                          <option>Today</option>
                          <option>This Week</option>
                          <option>This Month</option>
                          <option>This Quarter</option>
                          <option>This Year</option>
                          <option>Yesterday</option>
                          <option>Previous Week</option>
                          <option>Previous Month</option>
                          <option>Previous Quarter</option>
                          <option>Previous Year</option>
                          <option>Custom</option>
                        </Form.Select>
                      )}
                    </Dropdown>
                  </Card.Header>
                  <Card.Body className="text-muted text-center">
                    No items were invoiced in this time frame
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-3 h-100">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <b>Purchase Order</b>
                    <Dropdown
                      variant="light"
                      size="sm"
                      onClick={handlePurchaseOptionChange}
                    >
                      {purchaseOptions && (
                        <Form.Select
                          className="px-0 border-0 text-muted color-none py-1 px-3"
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            hover: "none",
                          }}
                        >
                          <option>Today</option>
                          <option>This Week</option>
                          <option>This Month</option>
                          <option>This Quarter</option>
                          <option>This Year</option>
                          <option>Yesterday</option>
                          <option>Previous Week</option>
                          <option>Previous Month</option>
                          <option>Previous Quarter</option>
                          <option>Previous Year</option>
                          <option>Custom</option>
                        </Form.Select>
                      )}
                    </Dropdown>
                  </Card.Header>
                  <Card.Body>
                    <p>
                      Quantity Ordered{" "}
                      <span className="float-end text-primary fw-bold">0</span>
                    </p>
                    <hr />
                    <p>
                      Total Cost{" "}
                      <span className="float-end text-primary fw-bold">
                        Rs.0.00
                      </span>
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Sales Order Table */}
            <Row className="mb-4 ">
              <Col>
                <Card>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <b>Sales Order</b>
                    <Dropdown
                      variant="light"
                      size="sm"
                      onClick={handleSaleOptionChange}
                    >
                      {saleOptions && (
                        <Form.Select
                          className="px-0 border-0 text-muted color-none py-1 px-3"
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            hover: "none",
                          }}
                        >
                          <option>Today</option>
                          <option>This Week</option>
                          <option>This Month</option>
                          <option>This Quarter</option>
                          <option>This Year</option>
                          <option>Yesterday</option>
                          <option>Previous Week</option>
                          <option>Previous Month</option>
                          <option>Previous Quarter</option>
                          <option>Previous Year</option>
                          <option>Custom</option>
                        </Form.Select>
                      )}
                    </Dropdown>
                  </Card.Header>
                  <Card.Body>
                    <div className="table-responsive">
                      <table className="table table-bordered text-center">
                        <thead>
                          <tr>
                            <th>Channel</th>
                            <th>Pending</th>
                            <th>Confirmed</th>
                            <th>Packed</th>
                            <th>Shipped</th>
                            <th>Invoiced</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={6} className="text-muted">
                              No sales were made in this time frame
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Chart */}
            <Row>
              <Col>
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <b>Sales Order Summary (in INR)</b>
                    <Dropdown
                      onClick={handleSaleOrderOptionChange}
                      variant="light"
                      size="sm"
                    >
                      {saleOrderOptions && (
                        <Form.Select
                          className="px-0 border-none text-muted color-none py-1 px-3 "
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            hover: "none",
                          }}
                        >
                          <option className="">Today</option>
                          <option>This Week</option>
                          <option>This Month</option>
                          <option>This Quarter</option>
                          <option>This Year</option>
                          <option>Yesterday</option>
                          <option>Previous Week</option>
                          <option>Previous Month</option>
                          <option>Previous Quarter</option>
                          <option>Previous Year</option>
                          <option>Custom</option>
                        </Form.Select>
                      )}
                    </Dropdown>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={9}>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={salesData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Col>
                      <Col md={3}>
                        <Card className="border text-center mt-4">
                          <Card.Body style={{ backgroundColor: "lightblue" }}>
                            <small className="text-muted">POINT OF SALE</small>
                            <h5 className="text-primary mt-2">Rs.0.00</h5>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
