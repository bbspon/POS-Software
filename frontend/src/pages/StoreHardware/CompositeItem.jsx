import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  InputGroup,
} from "react-bootstrap";
import { FaImage, FaPlus } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

const NewCompositeItem = () => {
  return (
   <>
    <div className="d-flex flex-row vh-100 bg-light">
        <Sidebar />
        <div className="flex-grow-1 p-3 p-md-5" style={{ overflowY: "auto", margin:'5rem 0' }}>
           <Container className="my-5 bg-white p-4 rounded shadow">
      <h4 className="mb-4" style={{ borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>New Composite Item</h4>

      {/* Basic Info */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label className="text-danger">Name*</Form.Label>
            <Form.Control placeholder="Enter item name" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <div className="border text-center p-3 h-100">
            <FaImage size={32} />
            <p className="mt-2 mb-0">
              Drag image(s) here or <a href="#">Browse images</a>
            </p>
            <small className="text-muted d-block">
              You can add up to 15 images, each not exceeding 5 MB and 7000 X 7000 pixels resolution.
            </small>
          </div>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>SKU</Form.Label>
            <Form.Control placeholder="Enter SKU" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label className="text-danger">Unit*</Form.Label>
            <Form.Control as="select">
              <option>Select or type to add</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control as="select">
              <option>Select a category</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <Form.Check label="Returnable Item" />
        </Col>
      </Row>

      {/* Associate Items */}
      <h6 className="text-danger mt-4">Associate Items*</h6>
      <Table bordered responsive className="mb-3">
        <thead>
          <tr>
            <th>Item Details</th>
            <th>Quantity</th>
            <th>Selling Price</th>
            <th>Cost Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control placeholder="Click to select an item" />
            </td>
            <td>
              <Form.Control type="number" defaultValue={1} />
            </td>
            <td>0.00</td>
            <td>0.00</td>
            <td className="text-danger text-center">✖</td>
          </tr>
        </tbody>
      </Table>

      <div className="mb-4">
        <Button variant="link" className="p-0 me-3">
          <FaPlus /> Add New Row
        </Button>
        <Button variant="link" className="p-0 text-primary">
          <FaPlus /> Add Services
        </Button>
        <div className="float-end">
          <strong>Total (Rs.):</strong> 0.00 | 0.00
        </div>
      </div>

      {/* Sales & Purchase Info */}
      <Row className="mb-4">
        <Col md={6}>
          <h5>Sales Information</h5>
          <Form.Group className="mb-3">
            <Form.Label className="text-danger">Selling Price (INR)*</Form.Label>
            <InputGroup>
              <Form.Control />
              <Button variant="outline-secondary">Copy from total</Button>
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
          <h5>Purchase Information</h5>
          <Form.Group className="mb-3">
            <Form.Label className="text-danger">Cost Price (INR)*</Form.Label>
            <InputGroup>
              <Form.Control />
              <Button variant="outline-secondary">Copy from total</Button>
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
      </Row>

      {/* Dimensions & Branding */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Label>Dimensions</Form.Label>
          <InputGroup>
            <Form.Control placeholder="L" />
            <Form.Control placeholder="W" />
            <Form.Control placeholder="H" />
            <Form.Select style={{ maxWidth: "80px" }}>
              <option>cm</option>
              <option>in</option>
            </Form.Select>
          </InputGroup>
          <small className="text-muted">Length X Width X Height</small>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control />
          </Form.Group>
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
        <Col md={6}>
          <Form.Group>
            <Form.Label>UPC</Form.Label>
            <Form.Control />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>MPN</Form.Label>
            <Form.Control />
          </Form.Group>
        </Col>
      </Row>
      <h4>Additional Information</h4>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Inventory Account</Form.Label>
            <Form.Control />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Opening Stock</Form.Label>
            <Form.Control />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Opening Stock Rate per Unit</Form.Label>
            <Form.Control />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group>
            <Form.Label>Reorder Level</Form.Label>
            <Form.Control />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Reorder Point</Form.Label>
            <Form.Control />
          </Form.Group>
        </Col>
      </Row>

      {/* Submit Button */}
      <div className="text-end">
        <Button variant="primary">Save</Button>
        <Button variant="secondary" className="ms-2">
          Cancel
        </Button>
      </div>
    </Container>
        </div>
    </div>
   </>
  );
};

export default NewCompositeItem;
