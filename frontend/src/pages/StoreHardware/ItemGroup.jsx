import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaPlus, FaTrash, FaImage } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

const ItemGroupPage = () => {
  const [attributes, setAttributes] = useState([
    { attribute: "", options: "" },
  ]);

  const handleAddAttribute = () => {
    setAttributes([...attributes, { attribute: "", options: "" }]);
  };

  const handleRemoveAttribute = (index) => {
    const updated = [...attributes];
    updated.splice(index, 1);
    setAttributes(updated);
  };

  return (
    <div className="d-flex flex-row vh-100 bg-light">
      {/* Sidebar */}
      <div className="d-none d-md-block bg-white shadow-sm vh-100">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1  "
        style={{ overflowY: "auto", margin: "6rem 10px" }}
      >
        <Container fluid className="bg-white rounded shadow-sm">
          <h4 className="mb-4 p-3" style={{ borderBottom: "1px solid #ccc" }}>
            New Item Group
          </h4>

          <div className="d-flex flex-row gap-5 justify-content-between mb-3">
            <div className="d-flex flex-row    justify-content-between mb-3">
              {/* Image Upload */}
              <Form.Group
                className="text-center border p-3 mb-3 mx-auto"
                style={{ maxWidth: "200px" }}
              >
                <FaImage size={32} />
                <p className="mt-2">
                  Drag image(s) here or <a href="#">Browse images</a>
                  <br />
                  <small className="text-muted">
                    You can add up to 15 images, each not exceeding 5 MB and
                    7000x7000 px.
                  </small>
                </p>
              </Form.Group>
            </div>

            <div className="w-100">
              {/* Type */}
              <Form.Group as={Row} className="mb-3 d-flex align-items-center ">
                <Form.Label column sm={12} md={2}>
                  Type
                </Form.Label>
                <Col sm={12} md={10}>
                  <Form.Check
                    inline
                    type="radio"
                    label="Goods"
                    name="type"
                    defaultChecked
                  />
                  <Form.Check inline type="radio" label="Service" name="type" />
                </Col>
              </Form.Group>

              {/* Item Group Name */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={12} md={2} className="text-secondary">
                  Item Group Name*
                </Form.Label>
                <Col sm={12} md={10}>
                  <Form.Control
                    type="text"
                    placeholder="Enter item group name"
                  />
                </Col>
              </Form.Group>

              {/* Description */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={12} md={2}>
                  Description
                </Form.Label>
                <Col sm={12} md={10}>
                  <Form.Control as="textarea" rows={3} />
                </Col>
              </Form.Group>

              {/* Returnable Checkbox */}
              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 12, offset: 0 }} md={{ span: 10, offset: 2 }}>
                  <Form.Check label="Returnable Item" />
                </Col>
              </Form.Group>
            </div>
          </div>

          {/* Unit / Manufacturer / Brand */}
          <Row className="mb-3">
            <Col sm={12} md={6} className="mb-2">
              <Form.Group>
                <Form.Label className="text-danger">Unit*</Form.Label>
                <Form.Control placeholder="Select or type to add" />
              </Form.Group>
            </Col>
            <Col sm={12} md={3} className="mb-2">
              <Form.Group>
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control placeholder="Select or Add Manufacturer" />
              </Form.Group>
            </Col>
            <Col sm={12} md={3}>
              <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control placeholder="Select or Add Brand" />
              </Form.Group>
            </Col>
          </Row>

          {/* Category */}
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control placeholder="Select a category" />
          </Form.Group>

          {/* Multiple Items Checkbox */}
          <Form.Group className="mb-3">
            <Form.Check
              label="Create Attributes and Options"
              defaultChecked
              className="text-danger"
            />
          </Form.Group>

          {/* Attribute Blocks */}
          {attributes.map((item, index) => (
            <Row className="mb-2" key={index}>
              <Col sm={12} md={5} className="mb-2">
                <Form.Group>
                  <Form.Label className="text-danger">Attribute*</Form.Label>
                  <Form.Control placeholder="e.g., Color" />
                </Form.Group>
              </Col>
              <Col sm={12} md={5} className="mb-2">
                <Form.Group>
                  <Form.Label className="text-danger">Options*</Form.Label>
                  <Form.Control placeholder="e.g., Red, Blue" />
                </Form.Group>
              </Col>
              <Col sm={12} md={2} className="d-flex align-items-end">
                {attributes.length > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveAttribute(index)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </Col>
            </Row>
          ))}

          {/* Add more attributes */}
          <Form.Group className="mb-4">
            <Button
              variant="link"
              onClick={handleAddAttribute}
              className="text-primary"
            >
              <FaPlus /> Add more attributes
            </Button>
          </Form.Group>

          {/* Inventory Type */}
          <Form.Group className="mb-3 border-top pt-3 d-flex  gap-3 justify-content-between">
            <div className="d-flex flex-row gap-2">
              <Form.Label>Select your Item Type</Form.Label>
              <Form.Check
                inline
                label="Inventory"
                type="radio"
                name="invtype"
                defaultChecked
              />
              <Form.Check
                inline
                label="Non-Inventory"
                type="radio"
                name="invtype"
              />
            </div>
            <div>
              <Form.Check
                inline
                label="Include Opening Stock"
                type="checkbox"
              />
            </div>
          </Form.Group>

          {/* Submit */}
          <div className="d-flex gap-2 justify-content-end">
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ItemGroupPage;
