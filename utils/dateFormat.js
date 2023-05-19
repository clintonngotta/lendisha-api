const formatDateTimeUS = (date) => {
	var d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();

	hours = d.getHours();
	minutes = d.getMinutes();
	seconds = d.getSeconds();

	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;

	if (hours <= 9) hours = "0" + hours;
	if (minutes <= 9) minutes = "0" + minutes;
	if (seconds <= 9) seconds = "0" + seconds;

	return (
		[year, month, day].join("-") + " " + [hours, minutes, seconds].join(":")
	);
};

module.exports = {
	formatDateTimeUS,
};
