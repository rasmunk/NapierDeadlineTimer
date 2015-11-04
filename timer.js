
//--- configs -------------------------
var ScrollSpeed = 0.022;
var ScrollWaitTime = 10000;

//-------------------------------------
var mainDiv = $("#maindiv");
var leftDiv = $("#leftdiv");
var rightDiv = $("#rightdiv");
var ScrollLimit = document.body.offsetHeight;
var clocks = [];

//Sort the Tiem array by soonest
function SortTime(a, b) {
	var ad = a.date;
	var bd = b.date;
	return ((ad < bd) ? -1 : ((ad > bd) ? 1 : 0));
}
times.sort(SortTime);

//RightDiv scrolling funcs
function ScrollUp() {
	rightDiv.delay(ScrollWaitTime).animate({ scrollTop: 0 }, ScrollLimit / ScrollSpeed, "linear", ScrollDown);
}
function ScrollDown() {
	rightDiv.delay(ScrollWaitTime).animate({ scrollTop: ScrollLimit }, ScrollLimit / ScrollSpeed, "linear", ScrollUp);
}

//Only start the scrolling functions if there is enough times to scroll.
if (times.length > 9) {
	ScrollUp();
}

//Left div times
for (var i = 0; i < times.length && i < 5; i++) {
	var t = times[i];
	var row = $('<div />', {
        "class": 'row timerRow',
		id: t.name + "clockrow"
	});
	var nameDiv = $('<div />', {
        "class": 'col-sm-2 timerName',
        html: t.name+"<br><span>"+t.date.toGMTString().slice(0,-7)+"</span>"
	});
	var clockcontainer = $('<div />', {
        "class": 'col-sm-10 timer'
	});
	var clockDiv = $('<div />', {
        id: t.name + "clock"
	});
	
	//create clock
	var clock = clockDiv.FlipClock({ clockFace: 'DailyCounter' });
	clock.setTime((t.date - new Date()) * 0.001);
	clock.setCountdown(true);
	clocks.push({t:t.date,c:clock});
	//add elements to page
	row.append(nameDiv);
	clockcontainer.append(clockDiv);
	row.append(clockcontainer);
	leftDiv.append(row);
}

//Right div times
for (var i = 5; i < times.length; i++) {
	var t = times[i];
	var row = $('<div />', {
        "class": 'row timerRow',
		id: t.name + "clockrow"
	});
	var nameDiv = $('<div />', {
        "class": 'col-sm-3 timerName timerNameRight',
        html: t.name+"<br><span>"+t.date.toGMTString().slice(0,-7)+"</span>"
	});
	var clockcontainer = $('<div />', {
        "class": 'col-sm-9 timer'
	});
	var clockDiv = $('<div />', {
        id: t.name + "clock"
	});
	var clock = clockDiv.FlipClock({ clockFace: 'DailyCounter2' });
	clock.setTime((t.date - new Date()) * 0.001);
	clock.setCountdown(true);
	clocks.push({t:t.date,c:clock});
	row.append(nameDiv);
	clockcontainer.append(clockDiv);
	row.append(clockcontainer);
	rightDiv.append(row);

}
//add a spacer to the right div, so the bottomest time get's pushed up slightly.
rightDiv.append($('<div />', { "class": 'spacer', text: "" }));
//figure out the scroll limits
rightDiv.scrollTop(999999);
ScrollLimit = rightDiv.scrollTop();
rightDiv.scrollTop(0);

function Resync(){
	for (var i = 0; i < clocks.length; i++) {
		var c = clocks[i];
		c.c.setTime((c.t - new Date()) * 0.001);
	}
}
setInterval(Resync(),100000);