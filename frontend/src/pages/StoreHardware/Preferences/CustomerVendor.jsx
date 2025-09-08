import React, { useState } from 'react'
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
import NewCustomField from './NewCustomField';

   
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
function CustomerVendor() {

   const [duplicateNames, setDuplicateNames] = useState(false);
   const [enablePriceList, setEnablePriceList] = useState(false);
   const [applyPriceListLine, setApplyPriceListLine] = useState(false);
   const [enableComposite, setEnableComposite] = useState(false);  
   const [addressFormat, setAddressFormat] = useState('');
   const [fieldOption, setFieldOption] = useState(false);
   const [customerVendor, setCustomerVendor] = useState(true);
   const [newCustomVendor, setNewCustomVendor] = useState(false);
   const [selected, setSelected] = useState("All");

   const handleNewCustomVendorOpen = () => {
     setCustomerVendor(false);
     setNewCustomVendor(true);
   }

   const handleNewCustomVendorClose = () => {
     setCustomerVendor(true);
     setNewCustomVendor(false);
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
    handleNewCustomVendorClose();
  };

  const handleCancel = () => {
    setLabelName('');
    setDataType('');
    setIsMandatory(false);
    setShowInPDF(false);
    handleNewCustomVendorClose();
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
  return (
   <>
       {customerVendor && (
         <div className=" bg-light vh-100">
         <Col sm={9} className="pt-3">
                  <h5>Customers and Vendors</h5>
                  <Tab.Container defaultActiveKey="general">
                    <Nav variant="tabs">
                      <Nav.Item>
                        <Nav.Link eventKey="general">General</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="field">
                          Field Customization
                        </Nav.Link>
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
                        <div className="bg-light border rounded  p-2 text-warning">
                          <input type="checkbox" /> Allow duplicates for
                          customer and vendor display name.
                        </div>
                        <h6 className="mt-3">Customer & Vendor Numbers</h6>
                        <span className="text-muted small">
                          Generate customer and vendor numbers automatically.
                          You can configure the series in which numbers are
                          generated while creating new records
                        </span>

                        <Form.Check
                          type="checkbox"
                          label="Enable Customer Numbers"
                          checked={duplicateNames}
                          onChange={(e) => setDuplicateNames(e.target.checked)}
                        />

                        <Form.Check
                          type="checkbox"
                          label="Enable Customer Numbers"
                          onChange={(e) => setDuplicateNames(e.target.checked)}
                        />

                        <div className="mt-2 bg-light border rounded p-3 text-primary">
                          <h6>Note:</h6>
                          <ul>
                            <li>
                              Generating these numbers may take a few minutes to
                              a few hours, depending on the number of records
                              that you have. The Customer Number field will be
                              available once this process is done.
                            </li>
                            <li>
                              Once you've enabled this feature, you cannot
                              disable it.
                            </li>
                          </ul>
                        </div>

                        {!duplicateNames && (
                          <div>
                            <span className="text-muted small p-2 ms-4">
                              You can configure a series to generate customer
                              numbers automatically for all your existing
                              customers. A new customer Number field will be
                              available, which will be mandatory when creating
                              customers.
                            </span>

                            <div className="bg-light border rounded p-2 ms-4 pe-4 text-warning mt-2">
                              <label className="pe-2">Prefix</label>
                              <input
                                className="border rounded px-2 py-1"
                                type="text"
                              />
                              <label className="pe-2 ms-5">
                                Unique No. Starts
                              </label>
                              <input
                                className="border rounded px-2 py-1"
                                type="text"
                              />
                            </div>
                          </div>
                        )}

                        <hr />
                        <h6>Default Customer Type</h6>
                        <p className="text-muted small">
                          Select the default customer type based on the kind of
                          customers you usually sell your products or services
                          to. The default customer type will be pre‑selected in
                          the customer creation form.
                        </p>
                        <Form.Check
                          type="radio"
                          label="Business"
                          checked={enablePriceList}
                          onChange={(e) => setEnablePriceList(e.target.checked)}
                        />

                        <Form.Check
                          type="radio"
                          label="Individual"
                          checked={enablePriceList}
                          onChange={(e) => setEnablePriceList(e.target.checked)}
                        />

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
                        <h6>Customer Credit Limit</h6>
                        <p className="text-muted small">
                          Credit Limit enables you to set limit on the
                          outstanding receivable amount of the customers.
                        </p>
                        <Form.Check
                          type="checkbox"
                          label="Enable Credit Limit"
                          checked={enableComposite}
                          onChange={(e) => setEnableComposite(e.target.checked)}
                          style={{
                            borderBottom: "1px solid #ccc",
                            paddingRight: "15px",
                            paddingBottom: "10px",
                          }}
                        />

                  
                 

                        <div className="mt-3 mb-3 ">
                          <h6 className="mb-3 ">
                            Customer and Vendor Billing Address Format
                            <small className="text-muted">
                              (Displayed in PDF only)
                            </small>
                          </h6>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <Dropdown as={ButtonGroup}>
                              <Button variant="light" disabled>
                                Insert Placeholders
                              </Button>
                              <Dropdown.Toggle split variant="light" />
                              <Dropdown.Menu
                                className="p-2"
                                style={{
                                  width: "300px", // Custom width
                                  maxHeight: "200px", // Max height to trigger scrolling
                                  overflowY: "auto", // Scroll if overflow
                                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow
                                  borderRadius: "8px", // Rounded corners

                                  position: "relative",
                                  bottom: "10px",
                                  right: "10%",
                                  transform: "translateX(-50%)",
                                }}
                              >
                                <Dropdown.Item>
                                  ${"{Display Name}"}
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  ${"{Contact Name}"}
                                </Dropdown.Item>
                                <Dropdown.Item>${"{Website}"}</Dropdown.Item>
                                <Dropdown.Item>${"{Email}"}</Dropdown.Item>
                                <Dropdown.Item>${"{Address}"}</Dropdown.Item>
                                <Dropdown.Item>${"{City}"}</Dropdown.Item>
                                <Dropdown.Item>${"{State}"}</Dropdown.Item>
                                <Dropdown.Item>${"{Zip}"}</Dropdown.Item>
                                <Dropdown.Item>${"{Country}"}</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            value={addressFormat}
                            onChange={(e) => setAddressFormat(e.target.value)}
                          />
                        </div>

                        <div className="mt-3 mb-3 ">
                          <h6 className="mb-3 ">
                            Customer and Vendor Shipping Address Format
                            <small className="text-muted">
                              (Displayed in PDF only)
                            </small>
                          </h6>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <Dropdown as={ButtonGroup}>
                              <Button variant="light" disabled>
                                Insert Placeholders
                              </Button>
                              <Dropdown.Toggle split variant="light" />
                              <Dropdown.Menu
                                className="p-2"
                                style={{
                                  width: "300px", // Custom width
                                  maxHeight: "200px", // Max height to trigger scrolling
                                  overflowY: "auto", // Scroll if overflow
                                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional: subtle shadow
                                  borderRadius: "8px", // Rounded corners

                                  position: "relative",
                                  bottom: "10px",
                                  right: "10%",
                                  transform: "translateX(-50%)",
                                }}
                              >
                                <Dropdown.Item>
                                  ${"{Display Name}"}
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  ${"{Contact Name}"}
                                </Dropdown.Item>
                                <Dropdown.Item>${"{Website}"}</Dropdown.Item>
                                <Dropdown.Item>${"{Email}"}</Dropdown.Item>
                                <Dropdown.Item>${"{Address}"}</Dropdown.Item>
                                <Dropdown.Item>${"{City}"}</Dropdown.Item>
                                <Dropdown.Item>${"{State}"}</Dropdown.Item>
                                <Dropdown.Item>${"{Zip}"}</Dropdown.Item>
                                <Dropdown.Item>${"{Country}"}</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
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
                        <div
                          style={{ fontFamily: "sans-serif", padding: "20px" }}
                        >
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
                              onClick={handleNewCustomVendorOpen}
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
                                <strong>Contact Type :</strong>
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
                                    <Dropdown.Item eventKey="All">
                                      All
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Details Page Menu">
                                      Customer
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="List Page - Action Menu">
                                      Vendor
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </Col>
                            </Row>

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
                                    <Dropdown.Item eventKey="All">
                                      All
                                    </Dropdown.Item>
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
                                className="text-lowercase small text-muted "
                                style={{ borderBottom: "1px solid #ccc" }}
                              >
                                <tr>
                                  <th>Button Name</th>
                                  <th>Button Name</th>
                                  <th>Permission</th>
                                  <th>Location</th>
                                </tr>
                              </thead>
                            </table>
                          </div>

                          {/* Placeholder text */}
                          <p className="text-muted text-center mt-3">
                            Create buttons which perform actions set by you.
                            What are you waiting for!
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
       )}  

       {newCustomVendor && (
         <div className="container border rounded mt-5 p-4" style={{ maxWidth: '700px' }}>
                  <div className="d-flex justify-content-between">
                    <h5><strong>New Custom Field – Shipments</strong></h5>
                    <span role="button" onClick={handleNewCustomVendorClose} style={{ cursor: 'pointer' }}>✖</span>
                  </div>
                  <hr />
        
                  <Form>
                    <Form.Group className="mb-3 row">
                      <Form.Label className="col-sm-3 col-form-label text-danger">Label Name*</Form.Label>
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
                      <Form.Label className="col-sm-3 col-form-label text-danger">Data Type*</Form.Label>
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
                      <Form.Label className="col-sm-3 col-form-label">Is Mandatory</Form.Label>
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
        
                    <Form.Group className="mb-4 row">
                      <Form.Label className="col-sm-3 col-form-label">Show in All PDFs</Form.Label>
                      <div className="col-sm-9 d-flex gap-4">
                        <Form.Check
                          type="radio"
                          label="Yes"
                          name="showInPDF"
                          checked={showInPDF}
                          onChange={() => setShowInPDF(true)}
                          inline
                        />
                      </div>
                    </Form.Group>
        
                    <div className="d-flex gap-2">
                      <Button variant="primary" onClick={handleSave} style={{ backgroundColor: '#4f7eff' }}>
                        Save
                      </Button>
                      <Button variant="light" onClick={handleCancel}>Cancel</Button>
                    </div>
                  </Form>
                </div>
       )}  
   </>
  )
}

export default CustomerVendor