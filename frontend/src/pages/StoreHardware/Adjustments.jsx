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
import {
  BsThreeDotsVertical,
  BsFillBarChartLineFill,
} from "react-icons/bs";
import { LuArrowDownUp } from "react-icons/lu";
import { BiImport } from "react-icons/bi";
import { CiExport } from "react-icons/ci";
import { HiOutlineRefresh } from "react-icons/hi";
import { RiArrowUpDownFill } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import Sidebar from "../../components/Sidebar";

const AdjustmentsList = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDefaultModal, setShowDefaultModal] = useState(false);
  const [selectedPriceList, setSelectedPriceList] = useState("");

  const toggleDropdown = () => setShowDropdown((prev) => !prev);
  const handleDefaultModal = () => setShowDefaultModal((prev) => !prev);

  return (
    <>
      {/* Modal */}
      <Modal show={showDefaultModal} onHide={handleDefaultModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Assign Default Price List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Select the price list that will apply by default for new retail transactions.
          </p>
          <Form.Group>
            <Form.Label>Default Price List</Form.Label>
            <Form.Select
              value={selectedPriceList}
              onChange={(e) => setSelectedPriceList(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Retail">Retail</option>
              <option value="Wholesale">Wholesale</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => alert("Saved!")}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleDefaultModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main Page */}
      <div className="d-flex flex-row vh-100 bg-light">
        <Sidebar />
        <div className="flex-grow-1 p-3 p-md-4" style={{ overflowY: "auto", marginTop:'5rem' }}>
          <Container fluid className="bg-white p-4 rounded shadow-sm">
            {/* Header Row */}
            <Row className="align-items-center mb-4">
              <Col>
                <h5 className="fw-bold mb-0">Inventory Adjustments</h5>
              </Col>

              <Col className="text-end d-flex justify-content-end align-items-center gap-3 flex-wrap">
                <span
                  className="text-primary d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                  onClick={handleDefaultModal}
                >
                  <BsFillBarChartLineFill />
                  <a href="/fifoCostLotTracking">     
                  FIFO Cost Lot Tracking Report </a>
             
                </span>

                <Button variant="primary">
                  <a
                    href="/newadjustment"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    + New
                  </a>
                </Button>

                <Dropdown align="end" show={showDropdown} onToggle={toggleDropdown}>
                  <Dropdown.Toggle
                    variant="light"
                    className="border-0 p-0"
                    style={{ boxShadow: "none" }}
                  >
                    <BsThreeDotsVertical size={20} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="d-flex align-items-center gap-2">
                      <LuArrowDownUp /> Sort by
                    </Dropdown.Item>
                    <Dropdown.Item className="d-flex align-items-center gap-2">
                      <BiImport /> Import
                    </Dropdown.Item>
                    <Dropdown.Item className="d-flex align-items-center gap-2">
                      <CiExport /> Export
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="d-flex align-items-center gap-2">
                      <HiOutlineRefresh /> Refresh List
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            {/* Table */}
            <Table    hover>
              <thead className="table-light">
                <tr style={{fontSize:'12px'}}>
                  <th >
                <div className="d-flex gap-2 align-items-center">
                 <input type="checkbox" /> DATE <RiArrowUpDownFill />
                </div>
                  </th>
                  <th>REASON</th>
                  <th>DESCRIPTION</th>
                  <th>STATUS</th>
                  <th>REFERENCE #</th>
                  <th>TYPE</th>
                  <th>CREATED BY</th>
                  <th>CREATED TIME</th>
                  <th>MODIFIED BY</th>
                  <th>MODIFIED TIME</th>
                  <th>
                    <CgSearch />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="11" className="text-center text-muted">
                   
                    <strong>No data to display</strong>
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

export default AdjustmentsList;
