// 
import React from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Details from "./Details";
import Edit from "./Edit";
import Delete from "./Delete";
import PayNowButton from "./PayNowButton";
import PaymentForm from "./PaymentForm";



const BorrowersTable = ({ loans, refresh, refreshBorrowers }) => {
  const borrowers = loans;

  const handleUpdate = () => {

    refreshBorrowers();
  };

  const handleDelete = () => {

    refreshBorrowers();
  };
  const [showForm, setShowForm] = useState(false);
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const handlePayNowClick = (borrower) => {
    setSelectedBorrower(borrower);
    setShowForm(true);
  };

  // ========================download csv==========================
  // const downloadCSV = () => {
  //   if (!borrowers || borrowers.length === 0) return;

  //   const headers = [
  //     "Sr No,Name,Loan Amount,Disbursement Date,Interest Rate,Interest Amount,Outstanding Amount,Status"
  //   ];

  //   const rows = borrowers.map((b, index) => 
  //     `${index + 1},${b.name},${b.loanAmount},${b.disbursementDate},${b.interestRate},${b.interestAmount},${b.outstanding},${b.status}`
  //   );

  //   const csvContent = headers.concat(rows).join("\n");

  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const url = URL.createObjectURL(blob);

  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "borrowers_table.csv";
  //   link.click();
  // };


  return (
    <div className="container d-flex justify-content-center flex-column ">

      <div className="table-responsive shadow-sm rounded table ">
        <Table bordered hover className="align-middle mb-0">
          <thead className="table-dark text-center">
            <tr>
              <th>Sr no</th>
              <th>Borrower Name</th>
              <th>Loan AMT(₹)</th>
              <th>Disbmt Dt</th>
              <th>INT Rate(%)</th>
              <th>INT Amt(₹)</th>
              <th>PNLT/day (₹)</th>
              <th>Outstanding Amt(₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {borrowers.map((b, index) => (
              <tr key={b.id}>
                <td>{index + 1}</td>
                <td>{b.name}</td>
                <td>{b.loanAmount.toLocaleString()}</td>
                {/* <td>{b.disbursementDate}</td> */}
                <td>{b.disbursementDate?.split("T")[0]}</td>

                <td>{b.interestRate}</td>
                <td>{b.interestAmount.toLocaleString()}</td>
                <td>{b.penalty?.toLocaleString() || 0}</td>

                <td>{b.outstanding.toLocaleString()}</td>
                <td>{b.status}</td>
                <td>
                  <Details borrower={b} />
                  <Edit borrower={b} onUpdate={handleUpdate} />
                  <Delete borrowerId={b.id}
                    onDelete={handleDelete}
                    refreshBorrowers={refreshBorrowers} />
                  <PayNowButton onClick={() => handlePayNowClick(b)} />


                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <h4 className="mb-3 fw-bold text-center">
        Total Borrowers: {borrowers.length}
      </h4>
      <PaymentForm
        show={showForm}
        onClose={() => setShowForm(false)}
        borrower={selectedBorrower}
      />

    </div>
  );
};

export default BorrowersTable;
