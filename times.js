var times = [
	{ name: "Lab Close", date: getLabClose()  },
	{ name: "Fallout 4", date: new Date("10/nov/15 0:01 AM") },
	{ name: "SAAS Day", date: getSaas() },
	{ name: "Xmas", date: new Date("25/Dec/2015") },
	{ name: "C&PS CW1", date: new Date("06/nov/2015 11:59 PM") },
	{ name: "C&PS CW2", date: new Date("04/dec/2015 5:00 PM") },
	{ name: "SE Exam", date: new Date("07/dec/2015 9:30 AM") },
	{ name: "ADS Exam", date: new Date("08/dec/2015 9:30 AM") },
	{ name: "DBS Exam", date: new Date("09/dec/2015 9:30 AM") },
	{ name: "C&PS Exam", date: new Date("08/dec/2015 1:30 PM") },
	{ name: "Thanksgiving", date: new Date("26/nov/2015") },
	{ name: "New Years", date: new Date("01/jan/2016") },
	{ name: "ADS CW", date: new Date("20/nov/2015 4:00 PM") },
	{ name: "SE CW2", date: new Date("27/nov/2015 4:00 PM") },
	{ name: "SD3 CW", date: new Date("02/dec/2015 4:00 PM") },
	{ name: "SE CW3", date: new Date("04/dec/2015 4:00 PM") },
  	{ name: "Star Wars: TFA", date: new Date("17/dec/2015 00:01 AM") },
	{ name: "MOSP Essay", date: new Date("11/dec/2015 04:00 PM") }
]

function getSaas() {
	var dd = new Date();
	if (dd.getDate() < 7) {
		dd.setDate(7)
	} else {
		dd.setDate(7)
		dd.setMonth(dd.getMonth() + 1);
	};
	return new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
}

function getLabClose() {
	var dd = new Date();
	var isWeekend = (dd.getDay() == 6) || (dd.getDay() == 0);
	// If it's a weekend and we're past 5pm, or it's a weekday and we're past 9pm
	// Set the date to tomorrow
	if ((isWeekend && dd.getHours() >= 17) || (!isWeekend && dd.getHours() >= 21)) {
		dd.setDate(dd.getDate() + 1);
	}
	// Re-check to see if tomorrow is a weekend
	isWeekend = (dd.getDay() == 6) || (dd.getDay() == 0);
	dd.setHours(isWeekend ? 17 : 21);
	dd.setMilliseconds(0);
	dd.setMinutes(0);
	dd.setSeconds(0);
	return dd;
};


function getWeek() {
	var tri1 = new Date("7 September 2015");
	var tri2 = new Date("11 January 2016");
	var dd = new Date();
	dd.setHours(0);
	dd.setMilliseconds(0);
	dd.setMinutes(0);
	dd.setSeconds(0);
	
	if(dd > tri2){
		//scale our date back to monday
		dd.setDate(dd.getDate() - (dd.getDay()-1));
		return Math.ceil((dd - tri2)*1.6534e-9);
	}else if(dd > tri1){
		//scale our date back to monday
		dd.setDate(dd.getDate() - (dd.getDay()-1));
		return Math.ceil((dd - tri1)*1.6534e-9);
	}
	return 0;
};
