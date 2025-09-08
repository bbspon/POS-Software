import React, { useState } from "react";
import { Container, Row, Nav } from "react-bootstrap";
import NewCustomField from "./NewCustomField";
function Packages() {
  const thStyle = {
    padding: "12px",
    backgroundColor: "#f9fafb",
    textAlign: "left",
    whiteSpace: "nowrap",
    fontSize: "13px",
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

    const [labelName, setLabelName] = useState("");
    const [dataType, setDataType] = useState("");
    const [isMandatory, setIsMandatory] = useState(false);
    const [showInPDF, setShowInPDF] = useState(false);
    const [newCustomField, setNewCustomFieldOpen] = useState(false);
    const [packages, setPackages] = useState(true);

    const handleNewCustomFieldOpen = () => {
      setNewCustomFieldOpen(true);
      setPackages(false);
    };
  
    const handleNewCustomFieldClose = () => {
      setNewCustomFieldOpen(false);
      setPackages(true);
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
      {packages && (
       <div className="d-flex flex-row vh-100 vw-100 bg-light">
        <div
          style={{
            fontFamily: "sans-serif",
            padding: "20px",
            width: "75%",
            width: "100%",
          }}
        >
          <h3>Packages</h3>
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "gray" }}>Custom Fields Usage: 0/135</div>
            <button
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "8px 16px",
              }}

              onClick={handleNewCustomFieldOpen}
            >
             
                + New Custom Field
        
            </button>
          </div>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="general">Field Customization</Nav.Link>
            </Nav.Item>
          </Nav>
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
      </div>
         
      )}

      {newCustomField && (
        <div style={{ width: "100%", height: "100vh", margin: "auto", border: "1px solid #eee", padding: "20px", borderRadius: "6px" }}>
      <div style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
        <h5>New Custom Field - Packages</h5>
        <button style={{ border: "none", background: "none", fontSize: "20px", cursor: "pointer" }} onClick={handleNewCustomFieldClose}>&times;</button>
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

export default Packages;
