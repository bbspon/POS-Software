import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { FaToggleOn } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";
const NewPriceList = () => {
  const [transactionType, setTransactionType] = useState("sales");
  const [priceListType, setPriceListType] = useState("all");
  const [pricingScheme, setPricingScheme] = useState("");
  const [currency, setCurrency] = useState("");
  const [discount, setDiscount] = useState("");
  const [customisedPrice, setCustomisedPrice] = useState("all");
  const [volumePrice, setVolumedPrice] = useState("all");
  return (
    <>
      <div className="d-flex flex-row vh-100 bg-light">
        <Sidebar />
        <div
          className="flex-grow-1 p-3 p-md-5"
          style={{ overflowY: "auto", margin: "5rem 0" }}
        >
          <div className="container mt-4">
            <Card className="p-4 shadow-sm">
              <h4 className="fw-bold mb-4">New Price List</h4>
              <Form>
                <Form.Group as={Row} className="mb-3" controlId="name">
                  <Form.Label column sm={2} className="fw-semibold text-danger">
                    Name*
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" placeholder="Enter name" />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2} className="fw-semibold">
                    Transaction Type
                  </Form.Label>
                  <Col sm={10} className="d-flex gap-3 align-items-center">
                    <Form.Check
                      inline
                      label="Sales"
                      name="transactionType"
                      type="radio"
                      id="sales"
                      checked={transactionType === "sales"}
                      onChange={() =>{setTransactionType("sales");
                       } }
                    />
                    <Form.Check
                      inline
                      label="Purchase"
                      name="transactionType"
                      type="radio"
                      id="purchase"
                      checked={transactionType === "purchase"}
                      onChange={() =>{ setTransactionType("purchase");
                         setPriceListType("all");
                      }}   
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2} className="fw-semibold">
                    Price List Type
                  </Form.Label>
                  <Col sm={10} className="d-flex gap-3">
                    <div
                      className={`border p-3 rounded flex-fill ${
                        priceListType === "all"
                          ? "border-primary"
                          : "border-light"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setPriceListType("all");
                        setCustomisedPrice("all");
                      }}
                    >
                      <div className="fw-semibold">All Items</div>
                      <div className="text-muted small">
                        Mark up or mark down the rates of all items
                      </div>
                    </div>

                    <div
                      className={`border p-3 rounded flex-fill ${
                        priceListType === "individual"
                          ? "border-primary"
                          : "border-light"
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setPriceListType("individual");
                        setCustomisedPrice("individual");
                      }}
                    >
                      <div className="fw-semibold">Individual Items</div>
                      <div className="text-muted small">
                        Customize the rate of each item
                      </div>
                    </div>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={2} className="fw-semibold">
                    Description
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter the description"
                    />
                  </Col>
                </Form.Group>

                {priceListType === "individual" && (
                  <div className="border rounded p-3 mb-3">
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Label>Pricing Scheme</Form.Label>
                        <Form.Select
                          value={pricingScheme}
                          onChange={(e) => setPricingScheme(e.target.value)}
                        >
                          <option value="">Select Scheme</option>
                          <option value="unit">Unit Pricing</option>
                          <option value="value">Value Pricing</option>
                        </Form.Select>
                      </Col>
                      <Col md={6}>
                        <Form.Label>Currency</Form.Label>
                        <Form.Select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                        >
                          <option value="">Select Currency</option>
                          <option value="INR">INR</option>
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Label>Discount %</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Enter discount percentage"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </div>
                )}

               {customisedPrice === "all" && (
                 <Row className="mb-3">
                  <Col md={6}>
                    <Form.Label className="text-danger fw-semibold">
                      Percentage*
                    </Form.Label>
                    <div className="d-flex">
                      <Form.Select className="me-2">
                        <option>Markup</option>
                        <option>Markdown</option>
                      </Form.Select>
                      <Form.Control type="number" placeholder="%" />
                    </div>
                  </Col>

                  <Col md={6}>
                    <Form.Label className="text-danger fw-semibold">
                      Round Off To*
                    </Form.Label>
                    <Form.Select>
                      <option>Never mind</option>
                      <option>0.01</option>
                      <option>0.10</option>
                      <option>1.00</option>
                    </Form.Select>
                    <div
                      className="text-primary small mt-1"
                      style={{ cursor: "pointer" }}
                    >
                      View Examples
                    </div>
                  </Col>
                </Row>
               )}

                <div className="d-flex gap-2">
                  <Button variant="primary">Save</Button>
                  <Button variant="light">Cancel</Button>
                </div>
              </Form>

              {customisedPrice === "individual" && (
                <div>
                  <div className="d-flex flex-row  align-items-center justify-content-between mt-5">
                    <h3>Customise Rates in Bulk</h3>
                    <h6 className="d-flex align-items-center gap-2">
                      <FaToggleOn />
                      Import Price List for Items
                    </h6>
                  </div>
                   <a href="" className="d-flex align-items-center gap-2 px-3 "
                   style={{textDecoration:"none"}}><CiSettings /> Update Rates in Bulk</a>


                  <div
                    className="d-flex flex-row  align-items-center justify-content-between mt-3"
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <h6 className="d-flex align-items-center gap-2">
                      Item Details <CiSearch />{" "}
                    </h6>
                    <h6>Sales Rate</h6>
                    <h6>Start Quantity</h6>
                    <h6>End Quantity</h6>
                    <h6>Custom Rate</h6>
                  </div>

                  <p className="mt-3 text-muted text-center p-3">
                    There are no items.
                  </p>
                </div>
              )}

              {priceListType === "individual" && (
                <div>
                  <div className="d-flex flex-row  align-items-center justify-content-between mt-5">
                    <h3>Customise Rates in Bulk</h3>
                    <h6 className="d-flex align-items-center gap-2">
                      <FaToggleOn />
                      Import Price List for Items
                    </h6>
                  </div>

                  <a href="" className="d-flex align-items-center gap-2 px-3 "
                   style={{textDecoration:"none"}}><CiSettings /> Update Rates in Bulk</a>

                  <div
                    className="d-flex flex-row  align-items-center justify-content-between mt-3"
                    style={{
                      border: "1px solid #ccc",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <h6 className="d-flex align-items-center gap-2">
                      Item Details <CiSearch />{" "}
                    </h6>
                    <h6>Purchase Rate</h6>
                    <h6>Start Quantity</h6>
                    <h6>End Quantity</h6>
                    <h6>Custom Rate</h6>
                  </div>

                  <p className="mt-3 text-muted text-center p-3">
                    There are no items.
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPriceList;
