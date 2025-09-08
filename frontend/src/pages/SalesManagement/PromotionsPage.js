import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table, Form } from "react-bootstrap";

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: "",
    status: "Active",
  });
  const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/promotions`;

  // Fetch promotions on load
  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await axios.get(API_URL);
      setPromotions(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (currentPromotion) {
        // UPDATE
        await axios.put(`${API_URL}/${currentPromotion._id}`, formData);
      } else {
        // CREATE
        await axios.post(API_URL, formData);
      }
      fetchPromotions();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving promotion:", error);
    }
  };

  const handleEdit = (promo) => {
    setCurrentPromotion(promo);
    setFormData({
      type: promo.type,
      name: promo.name,
      description: promo.description,
      status: promo.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchPromotions();
      } catch (error) {
        console.error("Error deleting promotion:", error);
      }
    }
  };

  const handleOpenModal = () => {
    setCurrentPromotion(null);
    setFormData({
      type: "",
      name: "",
      description: "",
      status: "Active",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPromotion(null);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Promotions Management</h4>
        <Button variant="primary" onClick={handleOpenModal}>
          + Add Promotion
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {promotions.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No promotions available
              </td>
            </tr>
          ) : (
            promotions.map((promo, index) => (
              <tr key={promo._id}>
                <td>{index + 1}</td>
                <td>{promo.type}</td>
                <td>{promo.name}</td>
                <td>{promo.description}</td>
                <td>{promo.status}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(promo)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(promo._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal for Create/Edit */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentPromotion ? "Edit Promotion" : "Add Promotion"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formType" className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Deprecated</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCreateOrUpdate}>
            {currentPromotion ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PromotionsPage;
