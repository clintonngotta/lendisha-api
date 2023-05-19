const config = {
	client: "mysql",
	connection: {
		host: "localhost",
		user: "root",
		password: "Password@123",
		database: "lendisha",
	},
	migrations: {
		directory: "./migrations",
	},
};

module.exports = config;
