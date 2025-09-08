import { useState } from "react";
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

function Shipments() {
  const [duplicateNames, setDuplicateNames] = useState(false);
  const [fieldOption, setFieldOption] = useState(false);
  const [shipment, setShipment] = useState(true);
  const [newShipment, setNewShipment] = useState(false);
const [labelName, setLabelName] = useState("");
const [dataType, setDataType] = useState("");
const [isMandatory, setIsMandatory] = useState(false);
const [showInPDF, setShowInPDF] = useState(false);

const handleSave = () => {
  // You can add form validation or API call here
  console.log("Saved:", {
    labelName,
    dataType,
    isMandatory,
    showInPDF,
  });
  handleShipmentClose(); // Close the form after saving
};

const handleCancel = () => {
  // Reset form fields and close the form
  setLabelName("");
  setDataType("");
  setIsMandatory(false);
  setShowInPDF(false);
  handleShipmentClose();
};

   const handleShipmentOpen = () => {
    setShipment(false);
    setNewShipment(true);
  };

  const handleShipmentClose = () => {
    setShipment(true);
    setNewShipment(false);
  };
  const handleFieldOption = () => {
    setFieldOption(!fieldOption);
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
  return (
    <>
     {shipment && (
      <div className=" bg-light vh-100 vw-100">
      <div className="d-flex flex-row w-100 vh-100">
         <Col sm={9} className="pt-3">
        <h5>Shipments</h5>
        <Tab.Container defaultActiveKey="general">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="general">General</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="field">Field Customization</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="mt-4">
            <Tab.Pane eventKey="general">
              <h6 className="mt-3">Shipment Notification</h6>

              <Form.Check
                type="checkbox"
                label="Do you want to send notifications to customers for carrier shipments?"
                checked={duplicateNames}
                onChange={(e) => setDuplicateNames(e.target.checked)}
              />

              <Form.Check
                type="checkbox"
                label="Do you want to send notifications to customers for manual shipments?"
                onChange={(e) => setDuplicateNames(e.target.checked)}
              />
              <p> </p>
              <div className="mt-2 border rounded p-3  ">
                <h6>Choose default Dispatch address</h6>
                <a href="">Change Address</a>
              </div>

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
                    onClick={handleShipmentOpen}
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
          </Tab.Content>
        </Tab.Container>
      </Col>
      </div>
    </div>
     )}

     {newShipment && (
       <div className="container border rounded mt-5 p-4" style={{ maxWidth: '700px' }}>
                 <div className="d-flex justify-content-between">
                   <h5><strong>New Custom Field – Shipments</strong></h5>
                   <span role="button"onClick={handleShipmentClose} style={{ cursor: 'pointer' }}>✖</span>
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

export default Shipments;
