import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FaImage } from "react-icons/fa";
import { BsQuestionOctagon } from "react-icons/bs";
import Sidebar from "../../components/Sidebar";

const Itemspage = () => {
  const [attributes, setAttributes] = useState([
    { attribute: "", options: "" },
  ]);

  return (
    <div className="d-flex flex-row vh-100 bg-light">
      {/* Sidebar */}
      <div className="d-none d-md-block bg-white shadow-sm vh-100">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{ overflowY: "auto", margin: "6rem 10px" }}
      >
        <Container fluid className="bg-white rounded shadow-sm p-4">
          <h4 className="mb-4 border-bottom pb-2">New Item</h4>

          {/* Image and Basic Info */}
          <Row className="mb-4">
            <Col md={3}>
              <Form.Group className="text-center border p-3 h-100 d-flex flex-column justify-content-center">
                <FaImage size={32} />
                <p className="mt-2 mb-0">
                  Drag image(s) here or <a href="#">Browse images</a>
                  <br />
                  <small className="text-muted">
                    Up to 15 images, max 5MB each, 7000x7000px
                  </small>
                </p>
              </Form.Group>
            </Col>

            <Col md={9}>
              <Row className="mb-3 align-items-center">
                <Form.Label column md={2}>
                  Type <BsQuestionOctagon />
                </Form.Label>
                <Col md={10}>
                  <Form.Check inline type="radio" label="Goods" name="type" />
                  <Form.Check inline type="radio" label="Service" name="type" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label column md={2}>
                  Name*
                </Form.Label>
                <Col md={10}>
                  <Form.Control placeholder="Enter item name" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label column md={2}>
                  SKU* <BsQuestionOctagon />
                </Form.Label>
                <Col md={10}>
                  <Form.Control placeholder="Enter SKU" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label column md={2}>
                  Unit* <BsQuestionOctagon />
                </Form.Label>
                <Col md={10}>
                  <Form.Control placeholder="Enter unit" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label column md={2}>
                  Category <BsQuestionOctagon />
                </Form.Label>
                <Col md={10}>
                  <Form.Control placeholder="Enter category" />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={{ span: 10, offset: 2 }}>
                  <Form.Check label="Returnable Item" inline />
                  <BsQuestionOctagon />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Dimensions & Branding */}
          <Row className="mb-4">
            <Col md={6}>
              <Form.Label>Dimensions</Form.Label>
              <InputGroup className="mb-1">
                <Form.Control placeholder="L" />
                <Form.Control placeholder="W" />
                <Form.Control placeholder="H" />
                <Form.Select style={{ maxWidth: "80px" }}>
                  <option>cm</option>
                  <option>in</option>
                </Form.Select>
              </InputGroup>
              <small className="text-muted">Length × Width × Height</small>
            </Col>
            <Col md={6}>
              <Form.Label>Weight</Form.Label>
              <InputGroup>
                <Form.Control placeholder="Weight" />
                <Form.Select style={{ maxWidth: "80px" }}>
                  <option>kg</option>
                  <option>g</option>
                  <option>lbs</option>
                  <option>oz</option>
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Manufacturer</Form.Label>
                <Form.Control placeholder="Select or Add Manufacturer" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control placeholder="Select or Add Brand" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            {["UPC", "MPN", "EAN", "ISBN"].map((label, index) => (
              <Col md={6} key={index}>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex align-items-center gap-2">
                    {label} <BsQuestionOctagon />
                  </Form.Label>
                  <Form.Control />
                </Form.Group>
              </Col>
            ))}
          </Row>

          {/* Sales & Purchase Info */}
          <Row className="mb-4">
            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="Sales Information"
                className="mb-2 fw-bold"
              />
              <Form.Group className="mb-3">
                <Form.Label>Selling Price (INR)</Form.Label>
                <InputGroup>
                  <span className="input-group-text">INR</span>
                  <Form.Control />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>MRP</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-danger">Account*</Form.Label>
                <Form.Select>
                  <option>Sales</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={2} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Check
                type="checkbox"
                label="Purchase Information"
                className="mb-2 fw-bold"
              />
              <Form.Group className="mb-3">
                <Form.Label>Cost Price (INR)*</Form.Label>
                <InputGroup>
                  <span className="input-group-text">INR</span>
                  <Form.Control />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="text-danger">Account*</Form.Label>
                <Form.Select>
                  <option>Cost of Goods Sold</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Preferred Vendor</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>

            <Col md={6} className="mt-4">
              <Form.Check
                type="checkbox"
                label="Track Inventory for this item"
                className="mb-2 fw-bold"
              />
              <p className="px-4 vw-100">
                You cannot enable/disable inventory tracking once you've created
                transactions for this item
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Inventory Account*</Form.Label>
                <Form.Select>
                  <option className="text-danger">Select</option>
                  <option>Finished Goods</option>
                  <option>Inventory Asset</option>
                  <option>Work In Progress</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Opening Stock</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reorder Point</Form.Label>
                <Form.Control />
              </Form.Group>
                   <Row className="mt-4">
                <Form.Group>
                  <Form.Label>Opening Stock Rate per Unit</Form.Label>
                  <Form.Control />
                </Form.Group>
          
            </Row>
            </Col>
       
          </Row>

          {/* Submit Buttons */}
          <div className="text-end">
            <Button variant="primary">Save</Button>
            <Button variant="secondary" className="ms-2">
              Cancel
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Itemspage;
