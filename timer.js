//--- configs -------------------------
var ScrollSpeed = 0.022;
var ScrollWaitTime = 10000;

//-------------------------------------
var clocks = [];
var snoop, doot, quack, rimshot;
var leftDiv, rightDiv;
var ScrollLimit;
var b56cal;

var currentEvent;
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

$(document).ready(function () {
  leftDiv = $("#leftColumnDiv");
  rightDiv = $("#rightColumnDiv");
  ScrollLimit = document.body.offsetHeight;
  snoop = new Audio('http://vps.samserrels.com/timer/smoke.mp3');
  doot = new Audio('http://vps.samserrels.com/timer/doot.mp3');
  quack = new Audio('http://vps.samserrels.com/timer/quack.mp3');
  rimshot = new Audio('http://vps.samserrels.com/timer/rimshot.mp3');
  laughtrack = new Audio('http://www.myinstants.com/media/sounds/tiduss-laugh.mp3');
  seinfield = new Audio('http://www.myinstants.com/media/sounds/seinfeld-season-7-closing-credits.mp3');
  sadtrumbone = new Audio('http://www.myinstants.com/media/sounds/sadtrombone.swf.mp3');
  airhorn = new Audio('http://www.myinstants.com/media/sounds/air-horn-club-sample.mp3');
  johncena = new Audio('http://www.myinstants.com/media/sounds/and-his-name-is-john-cena-1_6.mp3');
  nemesis = new Audio('http://www.myinstants.com/media/sounds/tf_nemesis.mp3');
  victory = new Audio('http://www.myinstants.com/media/sounds/victoryff.swf.mp3');
  b56cal = $.parseIcs('calendar.ics');
  //console.log(b56cal);
  
  //Remove past dates
  var now = new Date();
  times = $.grep(times, function (t) {
    return (t.date > now);
  });

  //Sort the Time array by soonest
  function SortTime(a, b) {
    var ad = a.date;
    var bd = b.date;
    return ((ad < bd) ? -1 : ((ad > bd) ? 1 : 0));
  }
  times.sort(SortTime);

  //Left div times
  for (var i = 0; i < times.length && i < 5; i++) {
    var t = times[i];
    var clockDiv = $('<div />', {
      id: t.name + "clock",
      "class": 'leftClockContainer'
    });
    var clock = clockDiv.FlipClock({
      clockFace: 'DailyCounter'
    });
    clock.setTime((t.date - new Date()) * 0.001);
    clock.setCountdown(true);
    clocks.push({
      t: t.date,
      c: clock
    });

    var nameDiv = $('<div />', {
      "class": 'leftClockName',
      html: t.name + "<br><span>" + t.date.toGMTString().slice(0, -7) + "</span>"
    });

    var row = $('<div />', {
      "class": 'leftColumnTimerContainer',
      id: t.name + "leftColumnTimerContainer"
    });
    row.append(nameDiv);
    row.append(clockDiv);

    leftDiv.append(row);
  }

  //Right div times
  for (var i = 5; i < times.length; i++) {
    var t = times[i];
    var clockDiv = $('<div />', {
      id: t.name + "clock",
      "class": 'rightClockContainer'
    });
    var clock = clockDiv.FlipClock({
      clockFace: 'DailyCounter2'
    });
    clock.setTime((t.date - new Date()) * 0.001);
    clock.setCountdown(true);
    clocks.push({
      t: t.date,
      c: clock
    });

    var nameDiv = $('<div />', {
      "class": 'rightClockName',
      html: t.name + "<br><span>" + t.date.toGMTString().slice(0, -7) + "</span>"
    });

    var row = $('<div />', {
      "class": 'rightColumnTimerContainer',
      id: t.name + "rightColumnTimerContainer"
    });
    row.append(nameDiv);
    row.append(clockDiv);

    rightDiv.append(row);
  }

  //add a spacer to the right div, so the bottomest time get's pushed up slightly.
  rightDiv.append($('<div />', {
    "class": 'spacer',
    text: ""
  }));
  //figure out the scroll limits
  rightDiv.scrollTop(999999);
  ScrollLimit = rightDiv.scrollTop();
  rightDiv.scrollTop(0);
  //Only start the scrolling functions if there is enough times to scroll.
  if (times.length > 9) {
    ScrollUp();
  }

  UpdateBottomLabel();
  setInterval(UpdateBottomLabel, 5000);
  getNextCalendarEvent();
});

function Resync() {
  for (var i = 0; i < clocks.length; i++) {
    var c = clocks[i];
    c.c.setTime((c.t - new Date()) * 0.001);
  }
}

$("body").keypress(function (event) {
  switch (event.keyCode) {
    case 114:
      Resync();
      break;
    case 102:
      FinalCountdown();
      break;
    case 35:
      snoop.play();
      break;
    case 115:
      Snow();
      break;
    case 100:
      doot.play();
      break;
    case 113:
      quack.play();
      break;
    case 98:
      rimshot.play();
      break;
    case 112:
      PartyTime();
      break;
	case 108;
	  laughtrack.play();
	  break;
	case 106;
	  seinfield.play();
	  break;
	case 116;
	  sadtrumbone.play();
	  break;
	case 65;
	  airhorn.play();
	  break;
	case 99;
	  johncena.play();
	  break;
	case 110;
	  nemesis.play();
	  break;
	case 118;
	  victory.play();
	  break;
	
  }

  //console.log(event);
});


function FinalCountdown() {
  for (var i = 0; i < clocks.length; i++) {
    var c = clocks[i];
    c.c.setTime(5184010);
  }
}

function Snow() {
  snowStorm.toggleSnow();
}

//RightDiv scrolling funcs
function ScrollUp() {
  rightDiv.delay(ScrollWaitTime).animate({
    scrollTop: 0
  }, ScrollLimit / ScrollSpeed, "linear", ScrollDown);
}

function ScrollDown() {
  rightDiv.delay(ScrollWaitTime).animate({
    scrollTop: ScrollLimit
  }, ScrollLimit / ScrollSpeed, "linear", ScrollUp);
}

function UpdateBottomLabel() {
  var bottomStr = "<p>" + (new Date()).toGMTString().slice(0, -7);
  bottomStr += " - Week " + getWeek() + "</p>";
  
  bottomStr += "<p><small>";
  var next = getNextCalendarEvent();
  if (next === null || next === undefined) {
    bottomStr += "Nothing until next week!";
  } else {
    if (currentEvent) {
      bottomStr += "Current Class: ";
    } else {
      bottomStr += "Next Class: ";
    }
    var d = icsDateToJSDate(next['dtstart'][0]['value']);
    var e = icsDateToJSDate(next['dtend'][0]['value']);
    bottomStr += next['summary'][0]['value'] + ": " + weekday[d.getDay()] + " ";
    bottomStr += d.getHours() + ":00 til " + e.getHours() + ":00";
  }
  bottomStr += "</small></p>";
  $("#fadeBottomDiv").html(bottomStr);
}

function SetFadeColour(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  $(".fadeTop").css("background", "linear-gradient(to bottom,  rgba(" + r + "," + g + "," + b + ",1) 0%,rgba(" + r + "," + g + "," + b + ",1) 46%,rgba(" + r + "," + g + "," + b + ",0) 100%)");
  $(".fadeBottom").css("background", "linear-gradient(to bottom,  rgba(" + r + "," + g + "," + b + ",0) 0%,rgba(" + r + "," + g + "," + b + ",1) 54%,rgba(" + r + "," + g + "," + b + ",1) 100%)");
}

function SetBGColour(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  $("body").css("background", "rgb(" + r + "," + g + "," + b + ")");
}

function SetTextColour(hex) {
  $("body").css("color", hex);
}
function SetInvertTextColour(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = 255 - parseInt(result[1], 16);
  var g = 255 - parseInt(result[2], 16);
  var b = 255 - parseInt(result[3], 16);
  $("body").css("color", "rgb(" + r + "," + g + "," + b + ")");
}

function SetColour(hex) {
  SetFadeColour(hex);
  SetBGColour(hex)
}

function Rainbow(phase) {
  if (phase == undefined) phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI * 2;

  var str = "#";
  var r = Math.round(Math.sin(frequency + 2 + phase) * width + center).toString(16);
  var g = Math.round(Math.sin(frequency + 0 + phase) * width + center).toString(16);
  var b = Math.round(Math.sin(frequency + 4 + phase) * width + center).toString(16);
  str += (r.length == 2 ? r : "0" + r);
  str += (g.length == 2 ? g : "0" + g);
  str += (b.length == 2 ? b : "0" + b);
  return str;
}

var partyCounter = 0.0;
var partyCallback;

function PartyTime() {
  if (partyCallback !== undefined) {
    clearInterval(partyCallback);
    partyCallback = undefined;
    SetColour("#000000");
    SetTextColour("#FFFFFF")
  } else {
    partyCallback = setInterval(function () {
      var c =Rainbow(partyCounter += 0.04);
      SetColour(c);
      SetInvertTextColour(c);
    }, 1000);
  }
}

function getNextCalendarEvent() {
  // Calendar will start on a monday
  var dtstart = b56cal['dtstart'][0]['value'];

  var now = new Date();
  var tomorrow_date = new Date(now.getTime() + 24*60*60*1000);

  var today = Array();
  var tomorrow = Array();

  var events = b56cal['event'];
  events.forEach(function (evt) {
    var eventDate = icsDateToJSDate(evt['dtstart'][0]['value']);
    if (eventDate.getDay() === now.getDay()) {
      today.push(evt);
    } else if (eventDate.getDay() === tomorrow_date.getDay()) {
      tomorrow.push(evt);
    }
  });

  var current;

  today.forEach(function(evt) {
    var s = icsDateToJSDate(evt['dtstart'][0]['value']);
    var e = icsDateToJSDate(evt['dtend'][0]['value']);

    var eventStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), s.getHours(), 0, 0);
    var eventEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), e.getHours(), 0, 0);

    //console.log("Considering " + evt['summary'][0]['value']);
    //console.log(eventStart);
    //console.log(eventEnd);
    //console.log(now.getHours());
    //console.log(eventStart < now.getHours());
    //console.log(now.getHours() < eventEnd);

    if(eventStart < now && now < eventEnd){
      current = evt;
    }
  });

  if (current === undefined || current === null) {
    var next;

    // Ok, we've not got something in progress, check for next event today
    today.forEach(function(evt){
      var s = icsDateToJSDate(evt['dtstart'][0]['value']);
      var eventStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), s.getHours(), 0, 0);
      if (now < eventStart) {
        if ((next === undefined || next === null) || evt < next) {
          next = evt;
        }
      }
    });

    if (next === undefined || next === null) {
      tomorrow.forEach(function(evt) {
        var s = icsDateToJSDate(evt['dtstart'][0]['value']);
        var eventStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), s.getHours(), 0, 0);
        if ((next === undefined || next === null) || evt < next) {
          next = evt;
        }
      });
    }

    currentEvent = false;
    return next;
  } else {
    currentEvent = true;
    return current;
  }
}

function icsDateToJSDate(date) {
  // 20160111T130000
  var year = parseInt(date.substr(0, 4));
  var month = parseInt(date.substr(4, 2));
  var day = parseInt(date.substr(6, 2));
  var hour = parseInt(date.substr(9, 2));
  var minute = parseInt(date.substr(11, 2));
  var sec = parseInt(date.substr(13, 2));

  // console.log(year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + sec);

  // JS needs some strange hacky off-by-one fix for month
  return new Date(year, month-1, day, hour, minute, sec);
}