import {
insertBorrower,
getAllBorrowers,
removeBorrower,
editBorrower
} from "../models/borrowerModel.js";


export const addLoan = (req, res) => {
insertBorrower(req.body, (err, result) => {
if (err) return res.status(500).json({ message: "Insert failed" });
res.status(201).json({ message: "Loan added", id: result.insertId });
});
};


export const getBorrowers = (req, res) => {
getAllBorrowers((err, results) => {
if (err) return res.status(500).json({ message: "DB Error" });
res.json(results);
});
};


export const deleteBorrower = (req, res) => {
removeBorrower(req.params.id, (err, result) => {
if (result.affectedRows === 0)
return res.status(404).json({ message: "Not found" });
res.json({ message: "Deleted successfully" });
});
};


export const updateBorrower = (req, res) => {
editBorrower(req.params.id, req.body, err => {
if (err) return res.status(500).json({ message: "Update failed" });
res.json({ message: "Updated successfully" });
});
};