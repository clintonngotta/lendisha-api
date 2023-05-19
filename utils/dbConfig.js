require("dotenv").config();
const mysql = require("mysql");

const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.DATABASE;
console.log("MYSQL_USER", MYSQL_USER);
// const databaseConnection = mysql.createConnection({
// 	host: MYSQL_HOST,
// 	user: MYSQL_USER,
// 	password: MYSQL_PASSWORD,
// 	database: DATABASE,
// });

// const databaseConnection = mysql.createPool({
// host: MYSQL_HOST,
// user: MYSQL_USER,
// password: MYSQL_PASSWORD,
// database: DATABASE,
// waitForConnections: true,
// connectionLimit: 10,
// queueLimit: 0,
// });

// databaseConnection.connect((err) => {
// 	if (err) {
// 		console.log(err);
// 		throw err;
// 	}
// 	console.log("Connected to database");
// });

const databaseConnection = mysql.createConnection({
	host: MYSQL_HOST,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: DATABASE,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
	authSwitchHandler: function (data, cb) {
		console.log("here:", data);
		sendResponse();
		if (data.pluginName === "mysql_native_password") {
			// Use the old authentication protocol
			cb(null, Buffer.from("password"));
		} else {
			// Use the default authentication protocol
			cb(new Error(`Unsupported authentication plugin: ${data.pluginName}`));
		}
	},
});

databaseConnection.connect(function (err) {
	if (err) {
		console.error("Error connecting to MySQL server:", err);
	} else {
		console.log("Connected to MySQL server");
	}
});

module.exports = databaseConnection;
