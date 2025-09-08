import React, { useState } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";

function SalesReturnsFieldCustomization() {
  const [saleReturn, setSaleReturn] = useState(true);
  const [newSalesReturn, setNewSalesReturn] = useState(false);
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
  const handleSaleReturnOpen = () => {
    setSaleReturn(false);
    setNewSalesReturn(true);
  };
  const handleSaleReturnClose = () => {
    setSaleReturn(true);
    setNewSalesReturn(false);
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
       {saleReturn && (    
      <Container fluid style={{ padding: "20px 40px" }}>
      <Row className="mb-3">
        <Col>
          <h5>Sales Returns</h5>
        </Col>
        <Col className="text-end">
          <span style={{ fontSize: "14px", marginRight: "15px", color: "#4f46e5" }}>
            Custom Fields Usage: <strong>0/135</strong>
          </span>
          <Button style={{ backgroundColor: "#4f46e5", borderColor: "#4f46e5" }} onClick={handleSaleReturnOpen}>
            + New Custom Field
          </Button>
        </Col>
      </Row> 

      <h6 style={{ fontSize: "14px", fontWeight: "500", marginBottom: "10px", borderBottom: "2px solid #4f46e5", display: "inline-block", paddingBottom: "5px" }}>
        Field Customization
      </h6>

      <Table bordered hover className="mt-2">
        <thead>
          <tr style={{ fontSize: "13px", backgroundColor: "#f9fafb" }}>
            <th>FIELD NAME</th>
            <th>DATA TYPE</th>
            <th>MANDATORY</th>
            <th>SHOW IN ALL PDFS</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} className="text-center text-muted" style={{ padding: "40px 10px" }}>
              Do you have information that doesn't go under any existing field? Go ahead and create a custom field.
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )}

  {newSalesReturn && (
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
            <h5>New Custom Field - Sales Returns</h5>
            <button
              style={{
                border: "none",
                background: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
             onClick={handleSaleReturnClose}
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

export default SalesReturnsFieldCustomization;
