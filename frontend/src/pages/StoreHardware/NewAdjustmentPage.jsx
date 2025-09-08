import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';

const InventoryAdjustmentPage = () => {
  const [adjustment, setAdjustment] = useState({
    mode: 'Quantity',
    referenceNumber: '',
    date: new Date().toISOString().slice(0, 10),
    account: '',
    reason: '',
    description: '',
    items: [],
    files: [],
    status: 'Draft'
  });
  const [filePreviews, setFilePreviews] = useState([]);
  const [totalAdjusted, setTotalAdjusted] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const accountOptions = ['COGS', 'Inventory Assets', 'Damaged Goods'];
  const reasonOptions = ['Damage', 'Expiry', 'Shrinkage', 'Audit Correction'];

  const handleAddItem = () => {
    setAdjustment(prev => ({
      ...prev,
      items: [...prev.items, {
        itemId: '', itemName: '', quantityAvailable: 100, // sample default
        newQuantityOnHand: 0, quantityAdjusted: 0, adjustmentType: 'Add',
        reasonPerItem: '', comments: ''
      }]
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...adjustment.items];
    updatedItems[index][field] = value;
    setAdjustment({ ...adjustment, items: updatedItems });

    const total = updatedItems.reduce((acc, item) => acc + Number(item.quantityAdjusted || 0), 0);
    setTotalAdjusted(total);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + adjustment.files.length > 5) return alert("Max 5 files allowed.");
    const updatedFiles = [...adjustment.files, ...files];
    setAdjustment({ ...adjustment, files: updatedFiles });

    setFilePreviews(updatedFiles.map(file => file.name));
  };

  const handleSubmit = async (finalize = false) => {
    try {
      const formData = new FormData();
      Object.entries(adjustment).forEach(([key, value]) => {
        if (key === 'items') {
          formData.append(key, JSON.stringify(value));
        } else if (key === 'files') {
          value.forEach(file => formData.append('files', file));
        } else {
          formData.append(key, value);
        }
      });
      if (finalize) formData.set('status', 'Adjusted');

      await axios.post('/api/inventory-adjustments', formData);
      setSuccessMessage(finalize ? 'Adjustment submitted!' : 'Saved as draft!');
    } catch (error) {
      alert(error.response?.data?.error || 'Error submitting');
    }
  };

  return (
    <>
    <div className="d-flex flex-row vh-100 bg-light">
        <Sidebar />
        <div   className="flex-grow-1 p-3 p-md-5"
          style={{ overflowY: "auto", margin: "5rem 0" }}>
             <Container className="my-4">
         <h4>New Inventory Adjustment</h4>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Adjustment Mode</Form.Label>
              <Form.Select value={adjustment.mode} onChange={e => setAdjustment({ ...adjustment, mode: e.target.value })}>
                <option value="Quantity">Quantity</option>
                <option value="Value">Value</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reference Number</Form.Label>
              <Form.Control placeholder="Auto-generated if blank"
                value={adjustment.referenceNumber}
                onChange={e => setAdjustment({ ...adjustment, referenceNumber: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Account</Form.Label>
              <Form.Select value={adjustment.account} onChange={e => setAdjustment({ ...adjustment, account: e.target.value })}>
                <option value="">-- Select --</option>
                {accountOptions.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={adjustment.date}
                onChange={e => setAdjustment({ ...adjustment, date: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Select value={adjustment.reason} onChange={e => setAdjustment({ ...adjustment, reason: e.target.value })}>
                <option value="">-- Select --</option>
                {reasonOptions.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" maxLength={500}
                value={adjustment.description}
                onChange={e => setAdjustment({ ...adjustment, description: e.target.value })} />
            </Form.Group>
          </Col>
        </Row>

        <hr />
        <h5>Item Details</h5>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>Name</th><th>Available</th><th>New Qty</th><th>Adjusted</th>
              <th>Type</th><th>Reason</th><th>Comment</th><th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {adjustment.items.map((item, index) => (
              <tr key={index}>
                <td><Form.Control value={item.itemName} onChange={e => handleItemChange(index, 'itemName', e.target.value)} /></td>
                <td><Form.Control value={item.quantityAvailable} readOnly /></td>
                <td><Form.Control type="number" value={item.newQuantityOnHand} onChange={e => handleItemChange(index, 'newQuantityOnHand', e.target.value)} /></td>
                <td><Form.Control type="number" value={item.quantityAdjusted} onChange={e => handleItemChange(index, 'quantityAdjusted', e.target.value)} /></td>
                <td>
                  <Form.Select value={item.adjustmentType} onChange={e => handleItemChange(index, 'adjustmentType', e.target.value)}>
                    <option value="Add">Add</option>
                    <option value="Subtract">Subtract</option>
                    <option value="Replace">Replace</option>
                  </Form.Select>
                </td>
                <td><Form.Control value={item.reasonPerItem} onChange={e => handleItemChange(index, 'reasonPerItem', e.target.value)} /></td>
                <td><Form.Control value={item.comments} onChange={e => handleItemChange(index, 'comments', e.target.value)} /></td>
                <td><Button size="sm" variant="danger" onClick={() => {
                  const updated = adjustment.items.filter((_, i) => i !== index);
                  setAdjustment({ ...adjustment, items: updated });
                }}>❌</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button onClick={handleAddItem}>+ Add Item</Button>

        <Form.Group className="my-4">
          <Form.Label>Upload Proof (max 5 files, 10MB each)</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileUpload} />
          {filePreviews.map((name, idx) => <div key={idx}>📎 {name}</div>)}
        </Form.Group>

        <h6>Total Quantity Adjusted: {totalAdjusted}</h6>

        <div className="mt-4 d-flex gap-2">
          <Button variant="secondary" onClick={() => handleSubmit(false)}>💾 Save as Draft</Button>
          <Button variant="success" onClick={() => handleSubmit(true)}>✅ Convert to Adjusted</Button>
          <Button variant="outline-dark" onClick={() => window.location.reload()}>❌ Cancel</Button>
        </div>
      </Form>
    </Container>
        </div>
    </div>
    </>
  );
};

export default InventoryAdjustmentPage;
