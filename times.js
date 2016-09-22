var times = [
	// Recurring
	{ name: "Lab Close", date: getLabClose()  },
	{ name: "SAAS Day", date: getSaas() },
	
	// Tri 1 15/16
	{ name: "Fallout 4", date: new Date("10/nov/15 0:01 AM") },
	{ name: "Xmas", date: new Date("25/Dec/2015") },
	{ name: "C&PS CW1", date: new Date("06/nov/2015 11:59 PM") },
	{ name: "C&PS CW2", date: new Date("06/dec/2015 11:55 PM") },
	{ name: "SE Exam", date: new Date("07/dec/2015 9:30 AM") },
	{ name: "ADS Exam", date: new Date("08/dec/2015 9:30 AM") },
	{ name: "DBS Exam", date: new Date("07/dec/2015 9:30 AM") },
	{ name: "C&PS Exam", date: new Date("08/dec/2015 1:30 PM") },
	{ name: "Thanksgiving", date: new Date("26/nov/2015") },
	{ name: "New Years", date: new Date("01/jan/2016") },
	{ name: "ADS CW", date: new Date("20/nov/2015 4:00 PM") },
	{ name: "SE CW2", date: new Date("27/nov/2015 12:00 AM") },
	{ name: "SD3 CW", date: new Date("01/dec/2015 11:59 PM") },
	{ name: "SE CW3", date: new Date("04/dec/2015 4:00 PM") },
  	{ name: "Star Wars: TFA", date: new Date("17/dec/2015 00:01 AM") },
	{ name: "MOSP Essay", date: new Date("11/dec/2015 04:00 PM") },

	// Tri 2 15/16
	{ name: "Division OBT", date: new Date("19/feb/2016 11:00 AM") },
	{ name: "Exam Results", date: new Date("26/jan/2016 08:30 AM") },
	{ name: "Global Game Jam", date: new Date("29/jan/2016 5:00 PM") },
	{ name: "AG Milestone 1", date: new Date("01/feb/2016 10:00 AM") },
	{ name: "I:SS Report", date: new Date("18/feb/2016 5:00 PM") },
	{ name: "DSA Report", date: new Date("26/feb/2016 5:00 PM") },
	{ name: "AG Milestone 2", date: new Date("29/feb/2016 10:00 AM") },
	{ name: "I:SS Essay", date: new Date("18/mar/2016 12:00 PM") },
	{ name: "AG Milestone 3", date: new Date("04/apr/2016 10:00 AM") },
	{ name: "DSA CW", date: new Date("8/apr/2016 1:00 PM") },
	{ name: "Hons Poster Session", date: new Date("13/apr/2016 12:00 PM") },
	{ name: "ProgFun CW1", date: new Date("28/feb/2016 11:59 PM") }	,
	{ name: "Comp Int CW", date: new Date("01/apr/2016 12:00 PM") },
	{ name: "Fun Par CW", date: new Date("07/apr/2016 04:00 PM") },
	{ name: "Grp Proj Report", date: new Date("29/apr/2016 04:00 PM") },
	{ name: "Globetrotters Reopens", date: new Date("28/feb/2016 12:00 PM") },
	{ name: "House of Cards S4", date: new Date("04/mar/2016 08:00 AM") },
	{ name: "Archer S7", date: new Date("31/mar/2016 08:00 PM") },
	{ name: "DSA Exam", date: new Date("29/apr/2016 09:30 AM") },
	{ name: "Comp Int Exam", date: new Date("03/may/2016 09:30 AM") },
	{ name: "Graphics Exam", date: new Date("03/may/2016 09:30 AM") },
	{ name: "Fun Par Exam", date: new Date("26/apr/2016 09:30 AM") },
	{ name: "Mobile Apps Exam", date: new Date("27/apr/2016 09:30 AM") },
	{ name: "SEM Exam", date: new Date("26/apr/2016 09:30 AM") },
	{ name: "I:SS Exam", date: new Date("26/apr/2016 09:30 AM") },
	
	// Tri 1 16/17
	{ name: "Halloween", date: new Date("31/oct/2016") },
	{ name: "ASEng TW Pitch", date: new Date("15/nov/2016 00:01 AM") },
	{ name: "WBL Hons Posters", date: new Date("16/nov/2016 01:00 PM") },
	{ name: "Star Wars: Rogue", date: new Date("15/dec/2016 00:01 AM") },
	{ name: "Thanksgiving", date: new Date("26/nov/2016") },
	{ name: "Xmas", date: new Date("25/Dec/2016") },
	{ name: "New Years", date: new Date("01/jan/2016") },

	{ name: "G4E", date: new Date("20/oct/2016 09:00 AM") },
	// Tri 2 16/17
	
	// Dr. Serrels
	{ name: "Dr. Serrels ETA", date: new Date("05/may/2020") }
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
	var tri1 = new Date("5 September 2016");
	var tri2 = new Date("11 January 2017");
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
