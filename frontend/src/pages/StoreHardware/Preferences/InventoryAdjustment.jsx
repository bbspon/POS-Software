import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';

function InventoryAdjustment() {
  const [inventoryAdjustment, setInventoryAdjustment] = useState(true);
  const [newInventoryAdjustment, setNewInventoryAdjustment] = useState(false);

  const [labelName, setLabelName] = useState('');
  const [dataType, setDataType] = useState('');
  const [isMandatory, setIsMandatory] = useState(false);
  const [showInPDF, setShowInPDF] = useState(false);

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

  const handleInventoryAdjustmentOpen = () => {
    setInventoryAdjustment(false);
    setNewInventoryAdjustment(true);
  };

  const handleInventoryAdjustmentClose = () => {
    setInventoryAdjustment(true);
    setNewInventoryAdjustment(false);
  };

  const handleSave = () => {
    console.log({
      labelName,
      dataType,
      isMandatory,
      showInPDF,
    });
    // Optionally reset or close form
    handleInventoryAdjustmentClose();
  };

  const handleCancel = () => {
    setLabelName('');
    setDataType('');
    setIsMandatory(false);
    setShowInPDF(false);
    handleInventoryAdjustmentClose();
  };

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

  return (
    <>
      {inventoryAdjustment && (
        <div className="d-flex flex-row vh-100 bg-light">
          <div style={{ fontFamily: "sans-serif", padding: "20px", width: "75%" }}>
            <h3>Inventory Adjustments</h3>
            <div className="d-flex justify-content-between mb-3">
              <div style={{ color: "gray" }}>Custom Fields Usage: 0/135</div>
              <button
                className="btn btn-primary"
                onClick={handleInventoryAdjustmentOpen}
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
        </div>
      )}

      {newInventoryAdjustment && (
        <div className="container border rounded mt-5 p-4" style={{ maxWidth: '700px' }}>
          <div className="d-flex justify-content-between">
            <h5><strong>New Custom Field – Inventory Adjustments</strong></h5>
            <span role="button" onClick={handleInventoryAdjustmentClose} style={{ cursor: 'pointer' }}>✖</span>
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
                <Form.Check
                  type="radio"
                  label="No"
                  name="showInPDF"
                  checked={!showInPDF}
                  onChange={() => setShowInPDF(false)}
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
  );
}

export default InventoryAdjustment;
