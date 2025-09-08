import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Dropdown,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

const PriceLists = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showDefaultModal, setShowDefaultModal] = useState(false);
  const [selectedPriceList, setSelectedPriceList] = useState("");

  const toggleOptions = () => setShowOptions(!showOptions);
  const handleDefaultModal = () => setShowDefaultModal(!showDefaultModal);

  return (
    <>
      {/* Modal for Default Price List */}
      <Modal
        show={showDefaultModal}
        onHide={handleDefaultModal}
        centered
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Assign the Default Price List for Retail Transactions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="mb-3">
            Select the price list that you want to apply by default every time
            you create a new retail transaction.
          </p>
          <Form.Group>
            <Form.Label>Default Price List</Form.Label>
            <Form.Select
              value={selectedPriceList}
              onChange={(e) => setSelectedPriceList(e.target.value)}
            >
              <option value="">Select</option>
        
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => alert("Saved!")}>
            Save
          </Button>
          <Button variant="light" onClick={handleDefaultModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main Page */}
      <div className="d-flex flex-row vh-100 bg-light">
        <Sidebar />
        <div
          className="flex-grow-1 p-3 p-md-5"
          style={{ overflowY: "auto", margin: "5rem 0" }}
        >
          <Container fluid className="p-4">
            <Row className="align-items-center mb-3">
              <Col>
                <h5 className="fw-bold d-flex gap-2 align-items-center position-relative">
                  <span onClick={toggleOptions} style={{ cursor: "pointer" }}>
                    All Price Lists
                  </span>
                  <FaCaretDown
                    size={20}
                    style={{ cursor: "pointer" }}
                    onClick={toggleOptions}
                  />
                  {showOptions && (
                    <div
                      className="position-absolute bg-white border rounded shadow-sm p-2"
                      style={{ top: "100%", left: 0, zIndex: 999 }}
                    >
                      <div
                        className="dropdown-item"
                        onClick={() => alert("All clicked")}
                      >
                        All
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => alert("Sale clicked")}
                      >
                        Sale
                      </div>
                      <div
                        className="dropdown-item"
                        onClick={() => alert("Purchases clicked")}
                      >
                        Purchases
                      </div>
                    </div>
                  )}
                </h5>
              </Col>

              {/* Responsive Button and Menu Area */}
              <Col className="text-end d-flex justify-content-end align-items-center gap-3 flex-wrap">
                <span
                  className="text-primary text-decoration-none"
                  onClick={handleDefaultModal}
                  style={{ cursor: "pointer" }}
                >
                  Default Price List for Retail Transactions
                </span>

                <Button variant="secondary " className="px-3" >
                <a href="/newpricelist" style={{textDecoration:"none",color:"white"}}>+ New</a> 
                </Button>

                <Dropdown
                  align="end"
                  show={showDropdown}
                  onToggle={() => setShowDropdown(!showDropdown)}
                >
                  <Dropdown.Toggle
                    variant="light"
                    className="border-0 p-0"
                    style={{ boxShadow: "none" }}
                  >
                    <BsThreeDotsVertical size={20} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Import</Dropdown.Item>
                    <Dropdown.Item href="#">Export</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Disable Price List</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            {/* Table */}
            <Table responsive bordered hover>
              <thead className="table-light">
                <tr>
                  <th>NAME AND DESCRIPTION</th>
                  <th>CURRENCY</th>
                  <th>DETAILS</th>
                  <th>PRICING SCHEME</th>
                  <th>ROUND OFF PREFERMANCE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    Special deals for regular customers? Or customized prices
                    for overseas clients?
                    <br />
                    <strong>Price Lists are the way to go.</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </div>
      </div>
    </>
  );
};

export default PriceLists;
