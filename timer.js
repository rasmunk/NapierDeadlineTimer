//--- configs -------------------------
var ScrollSpeed = 0.022;
var ScrollWaitTime = 10000;

//-------------------------------------
var clocks = [];
var snoop;

$(document).ready(function() {

	var mainDiv = $("#maindiv");
	var leftDiv = $("#leftdiv");
	var rightDiv = $("#rightdiv");
	var ScrollLimit = document.body.offsetHeight;
	snoop = new Audio('http://vps.samserrels.com/timer/smoke.mp3');
	doot = new Audio('http://vps.samserrels.com/timer/doot.mp3');
	quack = new Audio('http://vps.samserrels.com/timer/quack.mp3');
	rimshot = new Audio('http://vps.samserrels.com/timer/rimshot.mp3');
	
	//Remove past dates
	var now = new Date();
	times = $.grep(times, function(t ) {
		return (t.date > now);
	});

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

	function UpdateBottomLabel(){
		$("#fadeout").html((new Date()).toGMTString().slice(0,-7)+ "  -- Week "+getWeek());
	}

	UpdateBottomLabel();



function FinalCountdown(){
	for (var i = 0; i < clocks.length; i++) {
		var c = clocks[i];
		c.c.setTime(5184010);
	}
}

 $("body").keypress(function(event){
	 if(event.keyCode == 114){
		 Resync();
	 }else if(event.keyCode == 102){
		 FinalCountdown();
	 }else if(event.keyCode == 35){
		 snoop.play();
	 }else if(event.keyCode == 115){
		Snow();
	 }else if(event.keyCode == 100){
		 doot.play();
	 }else if(event.keyCode == 113){
		 quack.play();
	 }else if(event.keyCode == 113){
		 quack.play();
	 }else if(event.keyCode == 98){
		 rimshot.play();
	 }
	 console.log(event);
 });

	setInterval(Resync,100000);
	setInterval(UpdateBottomLabel,5000);
	setInterval(Tick,200);
});

function Tick(){
	if(clocks[0].c.getTime().time == 15600){
		snoop.play();
	}
}

function Snow(){
	snowStorm.toggleSnow();
}