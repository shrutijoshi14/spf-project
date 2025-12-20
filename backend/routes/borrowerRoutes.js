import express from "express";
import multer from "multer";
import {
addLoan,
getBorrowers,
deleteBorrower,
updateBorrower,importBorrowers, exportBorrowers
} from "../controllers/borrowerController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/add-loan", addLoan);
router.get("/borrowers", getBorrowers);
router.delete("/borrowers/:id", deleteBorrower);
router.put("/borrowers/:id", updateBorrower);
//ACJ
router.post("/borrowers/import", upload.single("borrowersFile"), importBorrowers);
router.get("/borrowers/export", exportBorrowers);

export default router;