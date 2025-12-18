import db from "../config/db.js";


export const insertBorrower = (data, callback) => {
const q = `INSERT INTO borrowers
(name, borrowerAddress, mobileNumber, loanAmount, disbursementDate,
interestRate, interestAmount, outstanding, loanReferredBy, penalty, status ,document)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`;


db.query(q, [
data.borrowerName,
data.borrowerAddress,
data.mobileNumber,
data.loanAmount,
data.disbursementDate,
data.interestRate,
data.interestAmount,
data.outstanding,
data.loanReferredBy || null,
data.penalty || 0,
data.status || "Active",
data.document
], callback);
};


export const getAllBorrowers = callback => {
db.query("SELECT * FROM borrowers", callback);
};


export const removeBorrower = (id, callback) => {
db.query("DELETE FROM borrowers WHERE id = ?", [id], callback);
};


export const editBorrower = (id, data, callback) => {
db.query(
"UPDATE borrowers SET name=?, loanAmount=?, interestRate=?, disbursementDate=?,penalty, outstanding=?, status=? WHERE id=?",
[data.name, data.loanAmount, data.interestRate, data.disbursementDate,data.penalty, data.outstanding, data.status, id],
callback
);
};