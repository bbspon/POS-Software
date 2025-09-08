import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Form,
  Alert,
  Modal,
} from "react-bootstrap";
import { FiRefreshCw, FiSettings, FiX, FiShare2 } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import Sidebar from "../../components/Sidebar";

const FifoCostLotTracking = () => {
  const [dateRange, setDateRange] = useState("This Month");
  const [itemFilter, setItemFilter] = useState("All Items");
  const [showAlert, setShowAlert] = useState(false);
  const [settingOptions, setSettingOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shareOptions, setShareOptions] = useState(false);
  const [exportOptions, setExportOptions] = useState(false);

  const [frequency, setFrequency] = useState("Daily");
  const [startDate, setStartDate] = useState("");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [emailRecipient, setEmailRecipient] = useState("");
  const [additionalRecipients, setAdditionalRecipients] = useState("");
  const [format, setFormat] = useState("PDF");

  const handleRunReport = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleSettings = () => setSettingOptions(!settingOptions);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleShare = () => setShareOptions(!shareOptions);
  const handleExport = () => setExportOptions(!exportOptions);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
    alert("Report Scheduled Successfully");
  };

  return (
    <div className="d-flex flex-row vh-100 bg-light">
      <Sidebar />
      <div className="flex-grow-1 p-3 p-md-4" style={{ overflowY: "auto", marginTop: "5rem" }}>
        <Container fluid className="mt-4 px-4">
          {/* Header */}
          <Row className="mb-3 align-items-center">
            <Col>
              <span className="text-muted">Inventory</span>
              <h5 className="fw-bold">FIFO Cost Lot Tracking</h5>
            </Col>
            <Col className="text-end">
              <div className="d-flex flex-wrap justify-content-end gap-2">
                <Button variant="outline-secondary" onClick={handleSettings}><FiSettings /></Button>
                <Button variant="outline-secondary" onClick={handleShowModal}><FiRefreshCw /></Button>
                <Button variant="outline-secondary" onClick={handleShare}><FiShare2 /></Button>
                <Button variant="outline-secondary" onClick={handleExport}>
                  Export <IoMdArrowDropdown />
                </Button>
                <Button variant="outline-danger"><FiX /></Button>
              </div>
            </Col>
          </Row>

          {/* Share Modal */}
          <Modal show={shareOptions} onHide={handleShare} size="md" centered>
            <Modal.Header closeButton>
              <Modal.Title>Share Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Select the users and the level of permission you want them to have in accessing the report
              </p>
              <Form className="mb-3">
                <Row className="g-3">
                  <Col xs={12} md={6}>
                    <Form.Label className="text-danger">Users*</Form.Label>
                    <Form.Select>
                      <option>Click to select users</option>
                    </Form.Select>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Label className="text-danger">Permissions*</Form.Label>
                    <Form.Select>
                      <option>Select permission</option>
                    </Form.Select>
                  </Col>
                  <Col xs={12}>
                    <Button className="w-100">Add User</Button>
                  </Col>
                </Row>
              </Form>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={handleShare}>Close</Button>
              </div>
            </Modal.Body>
          </Modal>

          {/* Export Settings */}
          {exportOptions && (
            <div className="bg-white shadow rounded p-4 mt-2 border text-start w-100">
              <h6 className="border-bottom pb-2 mb-3 text-muted">Customize Report</h6>
              <Row className="g-3">
                <Col xs={12} md={6} lg={4}>
                  <Form.Label>Date Range</Form.Label>
                  <Form.Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                    <option>Yesterday</option>
                    <option>Previous Week</option>
                    <option>Previous Month</option>
                    <option>Previous Quarter</option>
                    <option>Previous Year</option>
                    <option>Custom</option>
                  </Form.Select>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Select value={itemFilter} onChange={(e) => setItemFilter(e.target.value)}>
                    <option>All Items</option>
                    <option>Item 1</option>
                    <option>Item 2</option>
                    <option>Item 3</option>
                  </Form.Select>
                </Col>
              </Row>
            </div>
          )}

          {/* Report Settings Panel */}
          {settingOptions && (
            <div className="bg-white shadow rounded p-4 mt-2 border text-start w-100">
              <h6 className="border-bottom pb-2 mb-3 text-muted">Customize Report</h6>
              <Row className="g-3">
                <Col xs={12} md={6} lg={4}>
                  <Form.Label>Date Range</Form.Label>
                  <Form.Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>This Quarter</option>
                    <option>This Year</option>
                    <option>Yesterday</option>
                    <option>Previous Week</option>
                    <option>Previous Month</option>
                    <option>Previous Quarter</option>
                    <option>Previous Year</option>
                    <option>Custom</option>
                  </Form.Select>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Select value={itemFilter} onChange={(e) => setItemFilter(e.target.value)}>
                    <option>All Items</option>
                    <option>Item 1</option>
                    <option>Item 2</option>
                    <option>Item 3</option>
                  </Form.Select>
                </Col>
              </Row>
              <Col className="mt-3 d-flex gap-2 align-items-start">
                <Form.Check type="checkbox" className="me-2" />
                <span>Generate the report based on the Product Out transactions for the selected date range</span>
              </Col>
              <Col className="mt-3 d-flex gap-2 flex-wrap">
                <Button onClick={handleRunReport}>Run Report</Button>
                <Button variant="light" onClick={handleShowModal}>Schedule Report</Button>
              </Col>
            </div>
          )}

          {/* Schedule Modal */}
          <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Schedule Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Report Name :</Form.Label>
                  <Form.Control type="text" placeholder="Enter Report Name" />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Label className="text-danger">Frequency*</Form.Label>
                    <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </Form.Select>
                    <small className="text-muted">Report will be sent on a {frequency.toLowerCase()} basis.</small>
                  </Col>
                  <Col md={8}>
                    <Form.Label className="text-danger">Start Date & Time*</Form.Label>
                    <Row className="g-2">
                      <Col md={4}><Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></Col>
                      <Col md={4}>
                        <Form.Select value={hour} onChange={(e) => setHour(e.target.value)}>
                          {[...Array(24).keys()].map((hr) => (
                            <option key={hr}>{hr.toString().padStart(2, "0")}</option>
                          ))}
                        </Form.Select>
                        <small className="d-block text-center">Hours</small>
                      </Col>
                      <Col md={4}>
                        <Form.Select value={minute} onChange={(e) => setMinute(e.target.value)}>
                          {["00", "15", "30", "45"].map((min) => (
                            <option key={min}>{min}</option>
                          ))}
                        </Form.Select>
                        <small className="d-block text-center">Minutes</small>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <hr />
                <h5>Recipient Details</h5>
                <Form.Group className="mb-3">
                  <Form.Label className="text-danger">Email Recipients*</Form.Label>
                  <Form.Select value={emailRecipient} onChange={(e) => setEmailRecipient(e.target.value)}>
                    <option>Admin</option>
                    <option>User1</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Recipients</Form.Label>
                  <Form.Control as="textarea" rows={2} value={additionalRecipients} onChange={(e) => setAdditionalRecipients(e.target.value)} placeholder="Use comma (,) to separate multiple email addresses" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-danger">Attach Report As*</Form.Label>
                  <div>
                    <Form.Check inline label="PDF" name="reportFormat" type="radio" checked={format === "PDF"} onChange={() => setFormat("PDF")} />
                    <Form.Check inline label="XLS" name="reportFormat" type="radio" checked={format === "XLS"} onChange={() => setFormat("XLS")} />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                  <Button variant="primary" type="submit">Save</Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>

          {/* Filters */}
          <Row className="mb-3 align-items-end">
            <Col xs={12} md={2}><strong>Filters:</strong></Col>
            <Col xs={12} md={3}>
              <Form.Label>Date Range</Form.Label>
              <Form.Select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
                <option>Yesterday</option>
                <option>Previous Week</option>
                <option>Previous Month</option>
                <option>Previous Quarter</option>
                <option>Previous Year</option>
                <option>Custom</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={3}>
              <Form.Label>Item Name</Form.Label>
              <Form.Select value={itemFilter} onChange={(e) => setItemFilter(e.target.value)}>
                <option>All Items</option>
                <option>Product A</option>
                <option>Product B</option>
              </Form.Select>
            </Col>
            <Col xs={6} md={2}><Button className="w-100 mt-2" onClick={handleRunReport}>Run Report</Button></Col>
            <Col xs={6} md={2}><Button variant="outline-secondary" className="w-100 mt-2">+ More Filters</Button></Col>
          </Row>

          {showAlert && <Alert variant="success">Report Generated Successfully</Alert>}

          {/* Report Table */}
          <div className="border p-3 rounded bg-light text-center">
            <h5 className="mb-1">FIFO Cost Lot Tracking</h5>
            <p className="text-muted mb-3">From 01/06/2025 To 30/06/2025</p>
            <p className="mb-3 text-muted"><em>Report Generation Basis: Product In</em></p>

            <Table bordered hover responsive size="sm">
              <thead className="text-center table-primary">
                <tr>
                  <th colSpan={6}>PRODUCT IN</th>
                  <th colSpan={4}>PRODUCT OUT</th>
                </tr>
                <tr>
                  <th>Date</th>
                  <th>Transactions</th>
                  <th>Received From</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Cost Per Unit</th>
                  <th>Date</th>
                  <th>Transactions</th>
                  <th>Dispersed To</th>
                  <th>Qty Dispersed</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td colSpan={10} className="text-muted">No data to display</td>
                </tr>
              </tbody>
            </Table>

            <div className="text-end mt-2 fw-bold">
              **Amount is displayed in your base currency: <span className="badge bg-success">INR</span>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default FifoCostLotTracking;
