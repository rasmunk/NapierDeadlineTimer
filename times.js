var times = [
	// Tri 1 16/17
	{ name: "Lab Close", date: getLabClose()  },
	{ name: "SAAS Day", date: getSaas() },
	{ name: "Xmas", date: new Date("25/Dec/2016") },
	{ name: "Thanksgiving", date: new Date("26/nov/2016") },
	{ name: "New Years", date: new Date("01/jan/2016") },
  	{ name: "Star Wars: Rogue One", date: new Date("15/dec/2016 00:01 AM") },
	{ name: "Adv Software Engineering TW Plan & Pitch", date: new Date("15/nov/2016 00:01 AM") },

	// Tri 2 16/17
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
		return moment().week() - moment(tri2).week() + 1;
	}else if(dd > tri1){
		return moment().week() - moment(tri1).week() + 1;
	}
	return 0;
};
