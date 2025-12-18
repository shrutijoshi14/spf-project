import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

function Edit({ borrower, onUpdate }) {
    const [show, setShow] = useState(false);

    const [formData, setFormData] = useState(borrower);

    const handleShow = () => {
        setFormData(borrower); // load latest
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/borrowers/${formData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Update failed");
                return;
            }

            alert("Borrower Updated Successfully");

            onUpdate();  // refresh table
            setShow(false);

        } catch (error) {
            console.error("Update error:", error);
            alert("Something went wrong");
        }
    };



return (
    <>
        <Button variant="warning" className="me-2" onClick={handleShow}>
            <i className="bi bi-pencil-square"></i>
        </Button>

        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Edit Borrower</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Borrower Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </Form.Group>

                    {/* <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </Form.Group> */}

                    <Form.Group className="mb-3">
                        <Form.Label>Loan Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="loanAmount"
                            value={formData.loanAmount}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Interest Rate</Form.Label>
                        <Form.Control
                            type="number"
                            name="interestRate"
                            value={formData.interestRate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Disbursement Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="disbursementDate"
                            value={formData.disbursementDate}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    {/* <Form.Group className="mb-3">
              <Form.Label>Referred By</Form.Label>
              <Form.Control
                type="text"
                name="loanReferredBy"
                value={formData.loanReferredBy}
                onChange={handleChange}
              />
            </Form.Group> */}


                    <Form.Group className="mb-3">
                        <Form.Label>Outstanding Amt(₹)</Form.Label>
                        <Form.Control
                            type="number"
                            name="outstanding"
                            value={formData.outstanding}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Closed">Closed</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
);
};



export default Edit;
