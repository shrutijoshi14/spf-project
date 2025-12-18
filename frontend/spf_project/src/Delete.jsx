// 
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function Delete({ borrowerId, onDelete, refreshBorrowers }) {
  const [show, setShow] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/borrowers/${id}`, {
        method: "DELETE",
      });


      if (response.ok) {
        alert("Borrower deleted successfully!");
        refreshBorrowers();   // refresh after delete
      } else {
        alert("Failed to delete borrower!");
      }
    } catch (error) {
      console.error("Error deleting borrower:", error);
    }
  };

  // 🔥 FIX: confirmDelete must call handleDelete + close popup
  const confirmDelete = () => {
    handleDelete(borrowerId);
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" className="me-2" onClick={handleOpen}>
        <i className="bi bi-trash"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this borrower?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          {/* FIX: confirmDelete now exists */}
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Delete;
