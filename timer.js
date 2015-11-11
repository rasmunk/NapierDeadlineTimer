//--- configs -------------------------
var ScrollSpeed = 0.022;
var ScrollWaitTime = 10000;

//-------------------------------------
var clocks = [];
var snoop, doot, quack, rimshot;
var leftDiv, rightDiv;
var ScrollLimit;

$(document).ready(function () {
  leftDiv = $("#leftColumnDiv");
  rightDiv = $("#rightColumnDiv");
  ScrollLimit = document.body.offsetHeight;
  snoop = new Audio('http://vps.samserrels.com/timer/smoke.mp3');
  doot = new Audio('http://vps.samserrels.com/timer/doot.mp3');
  quack = new Audio('http://vps.samserrels.com/timer/quack.mp3');
  rimshot = new Audio('http://vps.samserrels.com/timer/rimshot.mp3');
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
  }

  console.log(event);
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
  $("#fadeBottomDiv").html((new Date()).toGMTString().slice(0, -7) + " - Week " + getWeek());
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
  } else {
    partyCallback = setInterval(function () {
      SetColour(Rainbow(partyCounter += 0.04));
    }, 1000);
  }
}