import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";

import { IoAddCircleSharp } from "react-icons/io5";
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
  Table,
} from "react-bootstrap";

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
  // Add more rows as needed
];
function ItemPerference() {
  const [duplicateNames, setDuplicateNames] = useState(false);
  const [enablePriceList, setEnablePriceList] = useState(false);
  const [applyPriceListLine, setApplyPriceListLine] = useState(false);
  const [enableComposite, setEnableComposite] = useState(false);
  const [enableSerial, setEnableSerial] = useState(false);
  const [enableBatch, setEnableBatch] = useState(false);
  const [notify, setNotify] = useState(false);
  const [fieldOption, setFieldOption] = useState(false);
  const [selected, setSelected] = useState("All");
  const [item, setItem] = useState(true);
  const [newItem, setNewItem] = useState(false);

  const  handleNewItemOpen = () => {
    setItem(false);
    setNewItem(true);
  }
  const handleNewItemClose = () => {
    setItem(true);
    setNewItem(false);
  }

   const handleSelect = (eventKey) => {
      setSelected(eventKey);
    };
    const handleFieldOption = () => {
      setFieldOption(!fieldOption);
    };
  
     const [labelName, setLabelName] = useState('');
      const [dataType, setDataType] = useState('');
      const [isMandatory, setIsMandatory] = useState(false);
      const [showInPDF, setShowInPDF] = useState(false);
    
    const handleSave = () => {
      console.log({
        labelName,
        dataType,
        isMandatory,
        showInPDF,
      });
      // Optionally reset or close form
      handleNewItemClose();
    };
  
    const handleCancel = () => {
      setLabelName('');
      setDataType('');
      setIsMandatory(false);
      setShowInPDF(false);
      handleNewItemClose();
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

  const handleEnbleSerial = () => {
    setEnableSerial(!enableSerial);
  };

  const handleEnbleBatch = () => {
    setEnableBatch(!enableBatch);
  };
  const handleNotify = () => {
    setNotify(!notify);
  };
  return (
    <>
      {item && (
        <div className="d-flex flex-row vh-100 bg-light">
          <div className="container mt-1">
            <Col sm={9} className="pt-3">
              <h5>Items</h5>
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
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            Set a decimal rate for your item quantity
                          </Form.Label>
                          <Form.Select>
                            <option>2</option>
                            <option>3</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Measure item dimensions in:</Form.Label>
                          <Form.Select>
                            <option>cm</option>
                            <option>inch</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-3">
                        <Form.Group>
                          <Form.Label>Measure item weights in:</Form.Label>
                          <Form.Select>
                            <option>kg</option>
                            <option>lb</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mt-3">
                        <Form.Group>
                          <Form.Label>
                            Select items when barcodes are scanned using:
                            <span className="text-primary ms-1" title="Info">
                              ⓘ
                            </span>
                          </Form.Label>
                          <Form.Select>
                            <option>SKU</option>
                            <option>Item Name</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Duplicate Item Name */}
                    <hr />
                    <h6>Duplicate Item Name</h6>
                    <Form.Check
                      type="checkbox"
                      label="Allow duplicate item names"
                      checked={duplicateNames}
                      onChange={(e) => setDuplicateNames(e.target.checked)}
                    />
                    <p className="text-muted small ms-4">
                      If you allow duplicate item names, all imports involving
                      items will use SKU as the primary field for mapping.
                    </p>
                    {!duplicateNames && (
                      <div className="bg-light border rounded p-2 ms-4 text-warning">
                        ⚠️ Before you enable this option, make the{" "}
                        <span className="text-primary">
                          SKU field active and mandatory.
                        </span>
                      </div>
                    )}

                    {/* Price Lists */}
                    <hr />
                    <h6>
                      Price Lists{" "}
                      <span className="text-primary ms-1" title="Info">
                        ⓘ
                      </span>
                    </h6>
                    <Form.Check
                      type="checkbox"
                      label="Enable Price Lists"
                      checked={enablePriceList}
                      onChange={(e) => setEnablePriceList(e.target.checked)}
                    />
                    <p className="text-muted small ms-4">
                      Price Lists enable you to customize the rates of the items
                      in your sales and purchase transactions.
                    </p>
                    {enablePriceList && (
                      <Form.Check
                        type="checkbox"
                        label="Apply price list at line item level"
                        checked={applyPriceListLine}
                        onChange={(e) =>
                          setApplyPriceListLine(e.target.checked)
                        }
                        className="ms-4"
                      />
                    )}

                    {/* Composite Items */}
                    <hr />
                    <h6>Composite Items</h6>
                    <Form.Check
                      type="checkbox"
                      label="Enable Composite Items"
                      checked={enableComposite}
                      onChange={(e) => setEnableComposite(e.target.checked)}
                    />

                    <h6 className="mt-4">
                      Inventory Start Date
                      <span className="text-danger">*</span>{" "}
                      <span title="Info">ⓘ</span>
                    </h6>
                    <Form.Control
                      type="date"
                      defaultValue="2024-05-25"
                      className="mb-4"
                      style={{ maxWidth: "250px" }}
                    />

                    <h6>Advanced Inventory Tracking</h6>
                    <Form.Check
                      onClick={handleEnbleSerial}
                      type="checkbox"
                      label="Enable Serial Number Tracking"
                      defaultChecked
                      className="mb-2"
                    />
                    <Form.Check
                      onClick={handleEnbleBatch}
                      type="checkbox"
                      label="Enable Batch Tracking"
                      defaultChecked
                      className="mb-2"
                    />
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

                    <hr />
                    {/* Stock & Notification */}
                    <Form.Check
                      type="checkbox"
                      label="Prevent stock from going below zero"
                      defaultChecked
                      className="mb-2"
                    />
                    <Form.Check
                      type="checkbox"
                      label="Notify me if an item's quantity reaches the reorder point"
                      defaultChecked
                      className="mb-2"
                      onClick={handleNotify}
                    />

                    {notify && (
                      <>
                        <div className="mt-2">
                          <span className="fw-semibold text-danger">
                            Notify to*
                          </span>
                        </div>

                        <div className="bg-light border rounded p-3 text-muted small">
                          Ah! The email address that you have entered is not an
                          organizational contact. To prevent security breach and
                          to ensure privacy, kindly choose an email that belongs
                          to your organization.{" "}
                          <span className="text-primary" role="button">
                            Change
                          </span>
                        </div>
                      </>
                    )}
                    <Form.Check
                      type="checkbox"
                      label="Track landed cost on items"
                      defaultChecked
                      className="mb-4"
                    />
                    <hr />
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
                          onClick={handleNewItemOpen}
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
                      <Row className="align-items-center mb-3">
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

                      {/* Sample Table Header */}
                      <div className="table-responsive">
                        <table className="table table-borderless text-center">
                          <thead className="text-uppercase small text-muted">
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
                        Create buttons which perform actions set by you. What
                        are you waiting for!
                      </p>
                    </Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="related">
                    <div className="text-center">
                      <IoAddCircleSharp style={{ fontSize: "75px" }} />
                      <p className="text-muted mt-3">
                        Create custom related lists to access relevant
                        information available from inside or outside the
                        application.
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
        </div>
      )}

      {newItem && (
        <div
          className="container border rounded mt-5 p-4"
          style={{ maxWidth: "700px" }}
        >
          <div className="d-flex justify-content-between">
            <h5>
              <strong>New Custom Field - Items</strong>
            </h5>
            <span
              role="button"
              
              style={{ cursor: "pointer" }}
              onClick={handleNewItemClose}
            >
              ✖
            </span>
          </div>
          <hr />

          <Form>
            <Form.Group className="mb-3 row">
              <Form.Label className="col-sm-3 col-form-label text-danger">
                Label Name*
              </Form.Label>
              <div className="col-sm-9">
                <Form.Control
                  type="text"
                  value={labelName}
                  onChange={(e) => setLabelName(e.target.value)}
                  placeholder="Enter label name"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3 row">
              <Form.Label className="col-sm-3 col-form-label text-danger">
                Data Type*
              </Form.Label>
              <div className="col-sm-9">
                <Form.Select
                  value={dataType}
                  onChange={(e) => setDataType(e.target.value)}
                >
                  <option value="">Select Data Type</option>
                  <option>Text</option>
                  <option>Number</option>
                  <option>Date</option>
                  <option>Dropdown</option>
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group className="mb-3 row">
              <Form.Label className="col-sm-3 col-form-label">
                Is Mandatory
              </Form.Label>
              <div className="col-sm-9 d-flex gap-4">
                <Form.Check
                  type="radio"
                  label="Yes"
                  name="isMandatory"
                  checked={isMandatory}
                  onChange={() => setIsMandatory(true)}
                  inline
                />
                <Form.Check
                  type="radio"
                  label="No"
                  name="isMandatory"
                  checked={!isMandatory}
                  onChange={() => setIsMandatory(false)}
                  inline
                />
              </div>
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                onClick={handleSave}
                style={{ backgroundColor: "#4f7eff" }}
              >
                Save
              </Button>
              <Button variant="light" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}

export default ItemPerference;
