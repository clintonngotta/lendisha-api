const UserModel = require("./model");

exports.findAll = (req, res) => {
	UserModel.getAll(req, res);
};
exports.getSingleById = (req, res) => {
	UserModel.getSingleByID(req, res);
};
exports.addNew = (req, res) => {
	UserModel.addNewUser(req, res);
};
exports.update = (req, res) => {
	UserModel.updateUser(req, res);
};

exports.delete = (req, res) => {
	UserModel.deleteUser(req, res);
};
