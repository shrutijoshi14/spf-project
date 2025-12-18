import db from "../config/db.js";


export const findUserByUsername = (username, callback) => {
db.query("SELECT * FROM users WHERE username = ?", [username], callback);
};


export const createUser = (username, password, callback) => {
db.query(
"INSERT INTO users (username, password) VALUES (?, ?)",
[username, password],
callback
);
};