import bcrypt from "bcryptjs";
import { findUserByUsername, createUser } from "../models/userModel.js";


export const registerUser = async (req, res) => {
const { username, password } = req.body;


if (!username || !password)
return res.status(400).json({ message: "All fields required" });


findUserByUsername(username, async (err, users) => {
if (users.length > 0)
return res.status(400).json({ message: "User already exists" });


const hashedPassword = await bcrypt.hash(password, 10);
createUser(username, hashedPassword, err => {
if (err) return res.status(500).json({ message: "Insert failed" });
res.status(201).json({ message: "User registered successfully" });
});
});
};


export const loginUser = async (req, res) => {
const { username, password } = req.body;


findUserByUsername(username, async (err, users) => {
if (users.length === 0)
return res.status(400).json({ message: "Invalid credentials" });


const isMatch = await bcrypt.compare(password, users[0].password);
if (!isMatch)
return res.status(400).json({ message: "Invalid credentials" });


res.json({ message: "Login successful", username });
});
};