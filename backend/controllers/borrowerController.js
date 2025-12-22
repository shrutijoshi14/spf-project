import fs from "fs";
import * as csv from "fast-csv";
import {
insertBorrower,
getAllBorrowers,
removeBorrower,
editBorrower,bulkInsertBorrowers
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

//ACJ


export const importBorrowers = (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const filePath = req.file.path;
    const borrowersToInsert = [];
    const requiredFields = ['name', 'mobileNumber', 'loanAmount', 'disbursementDate', 'interestRate'];

    const stream = fs.createReadStream(filePath);
    
    stream.pipe(csv.parse({ headers: true }))
        .on("data", (row) => {
            const isValid = requiredFields.every(field => row[field] && String(row[field]).trim() !== '');

            if (isValid) {
                const safe = val => (val && String(val).trim() !== '' ? String(val).trim() : null);
                borrowersToInsert.push([
                    safe(row.name), safe(row.borrowerAddress), safe(row.mobileNumber),
                    safe(row.loanAmount), safe(row.disbursementDate), safe(row.interestRate),
                    safe(row.interestAmount), safe(row.outstanding), safe(row.loanReferredBy),
                    safe(row.penalty) || 0, safe(row.status) || "Active"
                ]);
            }
        })
        .on("end", () => {
            fs.unlinkSync(filePath); // फाईल प्रोसेस झाल्यावर डिलीट करा

            if (borrowersToInsert.length === 0) {
                return res.status(400).json({ message: "No valid data found in CSV." });
            }

            bulkInsertBorrowers(borrowersToInsert, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Database import failed." });
                }
                res.status(200).json({ message: `${result.affectedRows} Borrowers imported successfully!` });
            });
        });
};

// ACJ
export const exportBorrowers = (req, res) => {
    console.log("📥 Export request received...");
    
    getAllBorrowers((err, results) => {
        if (err) {
            console.error("❌ SQL Error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=borrowers_data.csv');

        csv.write(results, { headers: true }).pipe(res);
    });
};