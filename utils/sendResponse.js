const { formatDateTimeUS } = require("./dateFormat");

const sendResponse = (res, data, message, isError = false, status = 200) => {
	const response = {
		isError,
		data,
		message,
		timestamp: formatDateTimeUS(new Date()),
		status,
	};
	res.status(status).json(response);
};

module.exports = sendResponse;
