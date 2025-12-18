import express from "express";
import {
addLoan,
getBorrowers,
deleteBorrower,
updateBorrower
} from "../controllers/borrowerController.js";


const router = express.Router();


router.post("/add-loan", addLoan);
router.get("/borrowers", getBorrowers);
router.delete("/borrowers/:id", deleteBorrower);
router.put("/borrowers/:id", updateBorrower);


export default router;