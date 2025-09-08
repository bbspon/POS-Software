import React, { useState } from "react";
import { Container, Dropdown, Row, Col, Nav, Tab } from "react-bootstrap";
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
function PurchaseReceives() {
  const [fieldOption, setFieldOption] = useState(false);
  const [selected, setSelected] = useState("All");
  const handleSelect = (eventKey) => {
    setSelected(eventKey);
  };
  const handleFieldOption = () => {
    setFieldOption(!fieldOption);
  };
  const [labelName, setLabelName] = useState("");
  const [dataType, setDataType] = useState("");
  const [isMandatory, setIsMandatory] = useState(false);
  const [showInPDF, setShowInPDF] = useState(false);
  const [purchaseReceives, setPurchaseReceives] = useState(true);
  const [newPurchaseReceives, setNewPurchaseReceives] = useState(false);

  const handlePurchaseReceivesOpen = () => {
    setPurchaseReceives(false);
    setNewPurchaseReceives(true);
  }

  const handlePurchaseReceivesClose = () => {
    setPurchaseReceives(true);
    setNewPurchaseReceives(false);
  }
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
      {purchaseReceives && (
        <div className=" bg-light vh-100">
          <Col sm={9} className="pt-3">
            <h4>Purchase Receives</h4>
            <Tab.Container defaultActiveKey="general">
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="field">Field Customization</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="mt-4">
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
                        onClick={handlePurchaseReceivesOpen}
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
                          className=" small text-muted "
                          style={{ borderBottom: "1px solid #ccc" }}
                        >
                          <tr>
                            <th>Button Name</th>
                            <th>Access Permission</th>
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
              </Tab.Content>
            </Tab.Container>
          </Col>
        </div>
      )}

      {newPurchaseReceives && (
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
            <h5>New Custom Field - Purchase Receives</h5>
            <button
              style={{
                border: "none",
                background: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={handlePurchaseReceivesClose}
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

export default PurchaseReceives;
