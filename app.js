const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const port = process.env.SERVER_PORT || 3000;
const compression = require("compression");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

// routes
const usersRoutes = require("./users/routes");

app.get("/", (req, res) => {
	res.json({ message: "Welcome To Lendisha" });
});
app.get("/api/v1", (req, res) => {
	res.json({ message: "Welcome To Lendisha API V1" });
});
app.use("/api/v1/users", usersRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
