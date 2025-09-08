import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CustomModules() {
  const [moduleName, setModuleName] = useState('');
  const [pluralName, setPluralName] = useState('');
  const [description, setDescription] = useState('');
  const [useInMyShop, setUseInMyShop] = useState(false);
  const [useInRetailSuite, setUseInRetailSuite] = useState(true);
  const [labelName, setLabelName] = useState('');
  const [dataType, setDataType] = useState('Text Box (Single Line)');
  const [createModule, setCreateModule] = useState(false);
  const [primaryField, setPrimaryField] = useState('');

  const resetSections = () => {
    setCreateModule(false);
    setPrimaryField('');
  };

  const handleCreateModule = () => {
    resetSections();
    setCreateModule(true);
  };

  const handlePrimaryField = () => {
    resetSections();
    setPrimaryField(true);
  };

  return (
    <>
      <div className='text-center vh-80 d-flex justify-content-center align-items-center flex-column p-4'>
        <h2 className='mb-3'>📦 Introducing Custom Modules</h2>
        <p className='text-muted w-75'>
          Create Custom Modules to record and track information that cannot be captured in the pre-defined modules and forms.
        </p>
        <button className='btn btn-primary mt-3' onClick={handleCreateModule}>
          + Create Module
        </button>
      </div>

{createModule && (
  <div className="container mt-5 border rounded p-4 shadow" style={{ maxWidth: '600px', backgroundColor: '#f9fafb' }}>
    <h5 className="mb-4">Create Module</h5>

    <div className="d-flex align-items-center gap-2 mb-4">
      <span className="text-primary d-flex align-items-center gap-1">
        <span style={{
          border: "2px solid #4f46e5",
          padding: "5px",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#4f46e5",
          color: "white",
          fontWeight: "bold"
        }}>
          1
        </span>
        Module Details
      </span>
    </div>

    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="text-danger">Module Name*</Form.Label>
        <Form.Control
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="Enter module name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-danger">Plural Name*</Form.Label>
        <Form.Control
          type="text"
          value={pluralName}
          onChange={(e) => setPluralName(e.target.value)}
          placeholder="Enter plural name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-danger">Description*</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Use Custom Module In</Form.Label>
        <div>
          <Form.Check
            type="checkbox"
            label="MyShop"
            checked={useInMyShop}
            onChange={() => setUseInMyShop(!useInMyShop)}
          />
          <Form.Check
            type="checkbox"
            label="RetailSuite"
            checked={useInRetailSuite}
            onChange={() => setUseInRetailSuite(!useInRetailSuite)}
          />
        </div>
      </Form.Group>

      <p className="text-muted" style={{ fontSize: '12px' }}>
        <strong>Note:</strong> Only admins and users with relevant permission can access the records of this custom module.
      </p>

      <div className="d-flex justify-content-end">
        <Button variant="primary" onClick={handlePrimaryField}>Next</Button>
        <Button variant="secondary" onClick={resetSections} className="ms-2">Cancel</Button>
      </div>
    </Form>
  </div>
)}


{primaryField && (
  <div className="container mt-5 border rounded p-4 shadow" style={{ maxWidth: '600px', backgroundColor: '#f9fafb' }}>
    <h5 className="mb-4">Create Module</h5>

    <div className="d-flex align-items-center gap-2 mb-4">
      <span className="text-success d-flex align-items-center">
        <i className="bi bi-check-circle-fill me-1"></i> Module Details
      </span>
      <hr className="flex-grow-1 mx-2" />
      <span className="text-primary d-flex align-items-center gap-1">
        <span style={{
          border: "2px solid #4f46e5",
          padding: "5px",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#4f46e5",
          color: "white",
          fontWeight: "bold"
        }}>
          2
        </span>
        Primary Field Properties
      </span>
    </div>

    <Form>
      <Form.Group className="mb-3">
        <Form.Label className="text-danger">Label Name*</Form.Label>
        <Form.Control
          type="text"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          placeholder="Enter label name"
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="text-danger">Data Type*</Form.Label>
        <Form.Select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option>Text Box (Single Line)</option>
          <option>Text Area (Multi Line)</option>
          <option>Number</option>
          <option>Date</option>
          <option>Email</option>
          <option>Dropdown</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="light" onClick={handleCreateModule}>← Back</Button>
        <div>
          <Button variant="primary" className="me-2">Save</Button>
          <Button variant="secondary" onClick={resetSections}>Cancel</Button>
        </div>
      </div>
    </Form>
  </div>
)}

    </>
  );
}

export default CustomModules;
