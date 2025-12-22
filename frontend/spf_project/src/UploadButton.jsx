// import React from "react";
// import { Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";



// function UploadButton() {
//     return (
//         <>
//             <Button variant="primary" className="me-2 upload" >
//                 <i className="bi bi-upload"></i> Upload
//             </Button>
//         </>
//     )

// }
// export default UploadButton;



import React, { useState, useRef } from "react";
import { Button, Modal, Table, Spinner, Form } from "react-bootstrap";
import Papa from "papaparse";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function UploadButton({ onImportSuccess }) {
  const [showModal, setShowModal] = useState(false);
  const [csvRows, setCsvRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const mandatoryFields = ["name", "mobileNumber", "loanAmount", "disbursementDate", "interestRate"];

  // १. फाईल निवडल्यावर ती रीड करणे
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvRows(results.data);
        setShowModal(true);
      },
      error: (err) => {
        alert("CSV फाईल वाचण्यात अडचण आली आहे!");
      },
    });
  };

  // २. टेबलमधील डेटा एडिट करण्यासाठी फंक्शन
  const handleCellEdit = (rowIndex, key, value) => {
    const updatedRows = [...csvRows];
    updatedRows[rowIndex][key] = value;
    setCsvRows(updatedRows);
  };

  // ३. बॅकएंडला डेटा पाठवणे
  const handleFinalUpload = async () => {
    setLoading(true);
    try {
      const csvString = Papa.unparse(csvRows);
      const blob = new Blob([csvString], { type: "text/csv" });
      
      const formData = new FormData();
      formData.append("borrowersFile", blob, "import_data.csv");

      const response = await axios.post("http://localhost:5000/api/borrowers/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "इम्पोर्ट यशस्वी झाला!");
      setShowModal(false);
      
      if (onImportSuccess) onImportSuccess();

    } catch (error) {
      console.error("Upload Error:", error);
      alert(error.response?.data?.message || "इम्पोर्ट अयशस्वी झाला!");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Button 
        variant="primary" 
        className="me-2 upload" 
        onClick={() => fileInputRef.current.click()}
      >
        <i className="bi bi-upload"></i> Upload CSV
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>CSV Data Preview & Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-primary small">You can Edit the Entries.</p>
          <div className="table-responsive">
            <Table striped bordered hover size="sm">
              <thead className="table-dark">
                <tr>
                  {csvRows.length > 0 && Object.keys(csvRows[0]).map((header, idx) => (
                    <th key={idx}>
                      {header} {mandatoryFields.includes(header) && <span className="text-danger">*</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(row).map((key, cellIndex) => (
                      <td key={cellIndex} style={{ padding: "0" }}>
                        <Form.Control
                          type="text"
                          value={row[key] || ""}
                          onChange={(e) => handleCellEdit(rowIndex, key, e.target.value)}
                          className="border-0 bg-transparent shadow-none rounded-0"
                          style={{ fontSize: "0.85rem" }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button 
            variant="success" 
            onClick={handleFinalUpload} 
            disabled={loading || csvRows.length === 0}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Confirm & Import"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadButton;