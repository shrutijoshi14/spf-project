// 
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function AddLoans({ onAdd }) {   // ✔ receive correct prop
    const [show, setShow] = useState(false);
    const [documentFile, setDocumentFile] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loanAmount = parseFloat(e.target.loanAmount.value);
        const interestRate = parseFloat(e.target.interestRate.value);

        const interestAmount = (loanAmount * (interestRate / 100)).toFixed(2);
        const outstanding = loanAmount;
        let documentName = "";

        if (documentFile) {
            const fileName = Date.now() + "_" + documentFile.name;
            documentName = fileName;

            const reader = new FileReader();
            reader.onload = () => {
                const fileData = reader.result;

                // Save file inside /public/assets/documents/
                const a = document.createElement("a");
                a.href = fileData;
                a.download = "assets/documents/" + fileName;
                a.click();
            };
            reader.readAsDataURL(documentFile);
        }


        const formData = {
            borrowerName: e.target.borrowerName.value,
            borrowerAddress: e.target.borrowerAddress.value,
            mobileNumber: e.target.mobileNumber.value,
            loanAmount,
            disbursementDate: e.target.disbursementDate.value,
            interestRate,
            interestAmount,
            outstanding,
            loanReferredBy: e.target.loanReferredBy.value,
            penalty: e.target.Penalty.value,
            status: "Active",
            document: documentName,

        };

        try {
            const response = await fetch("http://localhost:5000/add-loan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log("Saved:", data);

            alert("Loan added successfully!");

            // 🔥 Call parent refresh function
            if (onAdd) {
                onAdd();
            }

            handleClose();

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add loan!");
        }
    };

    return (
        <>
            {/* Add Loan Button */}
            <Button variant="primary" className="ms-2 new-loan" onClick={handleShow}>
                + Add Loan
            </Button>

            {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Loan</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Borrower Name</Form.Label>
                            <Form.Control type="text" name="borrowerName" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Borrower Address</Form.Label>
                            <Form.Control type="text" name="borrowerAddress" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" maxLength="10" name="mobileNumber" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Loan Amount</Form.Label>
                            <Form.Control type="number" name="loanAmount" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Disbursement Date</Form.Label>
                            <Form.Control type="date" name="disbursementDate" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Interest Rate (%)</Form.Label>
                            <Form.Control type="number" step="0.01" name="interestRate" required />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Loan Referred By</Form.Label>
                            <Form.Control type="text" name="loanReferredBy" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Penalty Charge</Form.Label>
                            <Form.Control type="number" name="Penalty" required />
                        </Form.Group>

                            <Form.Group className="mb-3">
                            <Form.Label>Upload Documents (Images)</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={(e) => setDocumentFile(e.target.files[0])}
                            />
                            </Form.Group>

                            <Button variant="success" type="submit" className="w-100">
                                Submit
                            </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddLoans;
