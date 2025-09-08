import React, { useState } from "react";
import {
  Container,
  Dropdown,
  Row,
  Col,
  Nav,
  Tab,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";

import { IoAddCircleSharp } from "react-icons/io5";

const thStyle = {
  padding: "12px",
  backgroundColor: "#f9fafb",
  fontWeight: "bold",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #e5e7eb",
  whiteSpace: "nowrap",
};
const fields = [
  {
    name: "Item Name",
    type: "Text",
    mandatory: "Yes",
    showInPdf: "No",
    status: "Active",
  },
  {
    name: "Price",
    type: "Number",
    mandatory: "Yes",
    showInPdf: "Yes",
    status: "Active",
  },
];
function Invoices() {
  const [qrEnabled, setQrEnabled] = useState(true);
  const [qrType, setQrType] = useState("Invoice URL");
  const [qrDescription, setQrDescription] = useState(
    "Scan the QR code to view the configured information."
  );

  const [labelName, setLabelName] = useState("");
  const [dataType, setDataType] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);
  const [showInPDF, setShowInPDF] = useState(false);
  const [hideZeroValue, setHideZeroValue] = useState(false);
  const [duplicateNames, setDuplicateNames] = useState(false);
  const [enableSerial, setEnableSerial] = useState(false);
  const [enableBatch, setEnableBatch] = useState(false);
  const [addressFormat, setAddressFormat] = useState("");
  const [notify, setNotify] = useState(false);
  const [fieldOption, setFieldOption] = useState(false);
  const [invoice, setInvoice] = useState(true);
  const [newInvoice, setNewInvoice] = useState(false);

  const handleNewInvoiceOpen = () => {
    setInvoice(false);
    setNewInvoice(true);
  };
  const handleNewInvoiceClose = () => {
    setInvoice(true);
    setNewInvoice(false);
  };

  const [selected, setSelected] = useState("All");
  const handleSelect = (eventKey) => {
    setSelected(eventKey);
  };
  const handleFieldOption = () => {
    setFieldOption(!fieldOption);
  };
  const handleSave = () => {
    console.log({ labelName, dataType, isMandatory, showInPDF });
  };

  const handleCancel = () => {
    setLabelName("");
    setDataType("");
    setIsMandatory(false);
    setShowInPDF(false);
  };
  return (
    <>
      {invoice && (
        <div className=" bg-light vh-100 vw-100">
          <Col sm={9} className="pt-3 h-100">
            <h5>Invoices</h5>
            <Tab.Container defaultActiveKey="general">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="general">General</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="field">Field Customization</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="buttons">Custom Buttons</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="related">Related Lists</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-4">
                <Tab.Pane eventKey="general">
                  <div className="bg-light ">
                    <input type="checkbox" /> Allow editing of Sent Invoice?
                  </div>
                  <hr />
                  <h6 className="mt-3">Invoice Order Number</h6>

                  <Form.Check
                    type="radio"
                    label="Use Sales Order Number"
                    checked={duplicateNames}
                    onChange={(e) => setDuplicateNames(e.target.checked)}
                  />

                  <Form.Check
                    type="radio"
                    label="Use Sales Order Reference Number"
                    onChange={(e) => setDuplicateNames(e.target.checked)}
                  />
                  <hr />

                  <h5>Invoice QR Code</h5>
                  <p style={{ fontSize: "14px" }}>
                    Enable and configure the QR code you want to display on the
                    PDF copy of an Invoice. Your customers can scan the QR code
                    using their device to access the URL or other information
                    that you configure.
                  </p>

                  <Form>
                    <Form.Check
                      type="switch"
                      id="qr-enable-switch"
                      label="Enabled"
                      checked={qrEnabled}
                      onChange={(e) => setQrEnabled(e.target.checked)}
                    />

                    <Form.Group className="mt-3">
                      <Form.Label>QR Code Type</Form.Label>
                      <Form.Select
                        value={qrType}
                        onChange={(e) => setQrType(e.target.value)}
                      >
                        <option>UPI ID</option>
                        <option>Invoice URL</option>
                        <option>Customer</option>
                        {/* Add more options if needed */}
                      </Form.Select>
                      <small className="text-muted">
                        When scanned, invoice URL will be displayed to the
                        customer. Recommended if you provide online payment
                        options.
                      </small>
                    </Form.Group>

                    <Form.Group className="mt-3">
                      <Form.Label>QR Code Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={qrDescription}
                        onChange={(e) => setQrDescription(e.target.value)}
                      />
                    </Form.Group>

                    <p className="mt-3" style={{ fontSize: "13px" }}>
                      <strong>Note:</strong> You can display this QR code in
                      your invoice PDFs. To do this, edit the invoice template
                      from <a href="#">PDF Templates in Settings</a> and select
                      the <em>Show Invoice QR Code</em> checkbox in the Other
                      Details section.
                    </p>

                    <hr />

                    <h6>Zero-Value Line Items</h6>
                    <Form.Check
                      type="checkbox"
                      id="hide-zero-value"
                      label="Hide zero-value line items"
                      checked={hideZeroValue}
                      onChange={(e) => setHideZeroValue(e.target.checked)}
                    />
                    <p className="text-muted" style={{ fontSize: "13px" }}>
                      Choose whether you want to hide zero-value line items in
                      an invoice's PDF and the Customer Portal. They will still
                      be visible while editing an invoice. This setting will not
                      apply to invoices whose total is zero.
                    </p>
                  </Form>

                  {enableBatch && (
                    <div className="ms-4">
                      <Form.Check
                        type="checkbox"
                        label="Allow duplicate batch numbers"
                        className="mb-2"
                      />
                      <Form.Check
                        type="checkbox"
                        label="Allow quantity to be added only to the sold batch when returned"
                      />
                    </div>
                  )}

                  {enableSerial && (
                    <div className="bg-light border rounded p-3 mt-3 d-flex justify-content-between align-items-center">
                      <div>
                        <strong>Tracked in:</strong> Invoices, Bills & Credit
                        Notes
                      </div>
                      <button className="btn btn-outline-secondary btn-sm">
                        ⚙ Configure
                      </button>
                    </div>
                  )}

                  <div className="mt-3 mb-3 ">
                    <h6 className="mb-3 ">Terms & Conditions</h6>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={addressFormat}
                      onChange={(e) => setAddressFormat(e.target.value)}
                    />
                  </div>

                  <div className="mt-3 mb-3 ">
                    <h6 className="mb-3 ">Customer Notes</h6>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      value={addressFormat}
                      onChange={(e) => setAddressFormat(e.target.value)}
                    />
                  </div>

                  <button className="btn btn-primary btn-sm">Save</button>

                  {/* Placeholder panes */}
                </Tab.Pane>
                <Tab.Pane eventKey="field" onClick={handleFieldOption}>
                  <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ color: "gray" }}>
                        Custom Fields Usage: 0/135
                      </div>
                      <button
                        style={{
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          padding: "8px 16px",
                        }}
                        onClick={handleNewInvoiceOpen}
                      >
                        + New Custom Field
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead style={{ backgroundColor: "#f9fafb" }}>
                          <tr>
                            <th style={thStyle}>FIELD NAME</th>
                            <th style={thStyle}>DATA TYPE</th>
                            <th style={thStyle}>MANDATORY</th>
                            <th style={thStyle}>SHOW IN ALL PDFS</th>
                            <th style={thStyle}>STATUS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fields.map((field, index) => (
                            <tr key={index}>
                              <td style={tdStyle}>{field.name}</td>
                              <td style={tdStyle}>{field.type}</td>
                              <td style={tdStyle}>{field.mandatory}</td>
                              <td style={tdStyle}>{field.showInPdf}</td>
                              <td style={tdStyle}>{field.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="buttons">
                  <Container fluid className="p-3">
                    <div className="p-3 d-flex flex-row align-items-center gap-3">
                      <Row className="align-items-center mb-3 text-lower">
                        <Col xs={12} sm="auto" className="mb-2 mb-sm-0">
                          <strong>Location :</strong>
                        </Col>
                        <Col xs={12} sm="auto">
                          <Dropdown onSelect={handleSelect}>
                            <Dropdown.Toggle
                              variant="outline-primary"
                              id="dropdown-basic"
                            >
                              {selected}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item eventKey="All">All</Dropdown.Item>
                              <Dropdown.Item eventKey="Details Page Menu">
                                Details Page Menu
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="List Page - Action Menu">
                                List Page - Action Menu
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="List Page - Bulk Action Menu">
                                List Page - Bulk Action Menu
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </Col>
                      </Row>
                    </div>

                    {/* Sample Table Header */}
                    <div className="table-responsive">
                      <table className="table table-borderless text-center">
                        <thead
                          className="small text-muted "
                          style={{ borderBottom: "1px solid #ccc" }}
                        >
                          <tr>
                            <th>Button Name</th>
                            <th>Permission</th>
                            <th>Location</th>
                          </tr>
                        </thead>
                      </table>
                    </div>

                    {/* Placeholder text */}
                    <p className="text-muted text-center mt-3">
                      Create buttons which perform actions set by you. What are
                      you waiting for!
                    </p>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="related">
                  <div className="text-center">
                    <IoAddCircleSharp style={{ fontSize: "75px" }} />
                    <p className="text-muted mt-3">
                      Create custom related lists to access relevant information
                      available from inside or outside the application.
                    </p>
                    <button className="btn btn-primary btn-sm ">
                      New Related List
                    </button>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </div>
      )}

      {newInvoice && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            margin: "auto",
            border: "1px solid #eee",
            padding: "20px",
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h5>New Custom Field - Invoices</h5>
            <button
              style={{
                border: "none",
                background: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={handleNewInvoiceClose}
            >
              &times;
            </button>
          </div>

          <form>
            <div className="mb-3">
              <label className="form-label" style={{ color: "red" }}>
                Label Name*
              </label>
              <input
                type="text"
                className="form-control"
                value={labelName}
                onChange={(e) => setLabelName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label" style={{ color: "red" }}>
                Data Type*
              </label>
              <select
                className="form-select"
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
              >
                <option value="">Select</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label me-3">Is Mandatory</label>
              <div>
                <label className="me-3">
                  <input
                    type="radio"
                    name="mandatory"
                    value="yes"
                    onChange={() => setIsMandatory(true)}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="mandatory"
                    value="no"
                    defaultChecked
                    onChange={() => setIsMandatory(false)}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label me-3">Show in All PDFs</label>
              <div>
                <label className="me-3">
                  <input
                    type="radio"
                    name="pdf"
                    value="yes"
                    onChange={() => setShowInPDF(true)}
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="pdf"
                    value="no"
                    defaultChecked
                    onChange={() => setShowInPDF(false)}
                  />{" "}
                  No
                </label>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-light border"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Invoices;
