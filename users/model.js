const databaseConnection = require("../utils/dbConfig");
const sendResponse = require("../utils/sendResponse");
const formatDate = require("../utils/dateFormat");
const bcrypt = require("bcrypt");

const getAll = (req, res) => {
	databaseConnection.connect((err) => {
		if (err) {
			console.error("Error connecting to the database:", err);
			sendResponse(res, null, err, true, 500);
			return;
		}

		databaseConnection.query("SELECT * FROM users", (err, data) => {
			if (err) {
				sendResponse(res, null, err.message, true, 500);
			} else {
				sendResponse(res, data, "Users retrieved successfully.");
			}
			databaseConnection.end();
		});
	});
};
const getSingleByID = (req, res) => {
	const id = req.params.id;
	databaseConnection.query(
		"SELECT * FROM users WHERE id=?",
		[id],
		(err, data) => {
			if (err) {
				sendResponse(res, [], err.message, true, 500);
			} else {
				delete data[0].password;
				sendResponse(res, data, "User retrieved successfully.");
			}
		}
	);
};
const addNewUser = (req, res) => {
	const fullname = req.body.fullname;
	const email = req.body.email;
	const phone = req.body.phone;
	const password = req.body.password;
	const currentDateTime = formatDate.formatDateTimeUS(new Date());

	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			console.error("Error hashing password:", err);
			sendResponse(res, [], err, true, 500);
		}
		databaseConnection.query(
			"INSERT INTO users VALUES (?,?,?,?,?,?,?)",
			[null, fullname, email, phone, hash, currentDateTime, currentDateTime],
			(err, data) => {
				if (err) {
					console.log(err);
					if (err.code == "ER_DUP_ENTRY") {
						sendResponse(res, [], "User already registered", true, 500);
					} else {
						sendResponse(res, [], err.message, true, 500);
					}
				} else {
					delete req.body.password;
					sendResponse(res, req.body, "User added successfully.");
				}
			}
		);
	});
};

const updateUser = (req, res) => {
	const id = req.params.id;
	const fullname = req.body.fullname;
	const email = req.body.email;
	const phone = req.body.phone;
	const password = req.body.password;
	const currentDateTime = formatDate.formatDateTimeUS(new Date());

	bcrypt.hash(password, 10, (err, hash) => {
		if (err) {
			console.error("Error hashing password:", err);
			sendResponse(res, [], err, true, 500);
		}
		databaseConnection.query(
			"UPDATE users SET fullname=?,email=?, phone=?,password=?, updated_at=? WHERE id=?",
			[fullname, email, phone, hash, currentDateTime, id],
			(err, data) => {
				if (err) {
					sendResponse(res, [], err.message, true, 500);
				} else {
					if (data.affectedRows > 0) {
						delete req.body.password;
						sendResponse(res, req.body, "User updated successfully.");
					} else {
						sendResponse(res, [], data.message, true, 500);
					}
				}
			}
		);
	});
};

const deleteUser = (req, res) => {
	const id = req.params.id;
	databaseConnection.query("Delete from users where id = ?", [id], (err) => {
		if (err) {
			sendResponse(res, [], err.message, true, 500);
		} else {
			sendResponse(res, [], "User Deleted successfully.");
		}
	});
};
module.exports = {
	getAll,
	addNewUser,
	updateUser,
	deleteUser,
	getSingleByID,
};
