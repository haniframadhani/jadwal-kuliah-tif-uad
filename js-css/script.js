const display = document.getElementById('clock');
const audio = new Audio('js-css/alarm/airraidsiren.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;
function dateToText(date) {
	var hours = date.getHours()
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	if (minutes < 10) minutes = '0' + minutes;
	if (seconds < 10) seconds = '0' + seconds;
	if (hours < 10) hours = '0' + hours;
	return hours + ":" + minutes + ":" + seconds;
}
function updateClocks() {
	for (var i = 0; i < window.arrClocks.length; i++) {
		var clock = window.arrClocks[i];
		var offset = window.arrOffsets[i];
		clock.innerHTML = dateToText(new Date(new Date().getTime() + offset));
	}
}
function startClocks() {
	clockElements = document.getElementsByClassName('clock');
	window.arrClocks = []
	window.arrOffsets = [];
	var j = 0;
	for (var i = 0; i < clockElements.length; i++) {
		el = clockElements[i];
		timezone = parseInt(el.getAttribute('timezone'));
		if (!isNaN(timezone)) {
			var tzDifference = timezone * 60 + (new Date()).getTimezoneOffset();
			var offset = tzDifference * 60 * 1000;
			window.arrClocks.push(el);
			window.arrOffsets.push(offset);
		}
	}
	updateClocks();
	clockID = setInterval(updateClocks, 1000);
}
function setAlarmTime(value) {
	alarmTime = value;
}

function setAlarm() {
	if (alarmTime) {
		const current = new Date();
		const timeToAlarm = new Date(alarmTime);

		if (timeToAlarm > current) {
			const timeout = timeToAlarm.getTime() - current.getTime();
			alarmTimeout = setTimeout(() => audio.play(), timeout);
			alert('Alarm set');
		}
	}
}

function clearAlarm() {
	audio.pause();
	if (alarmTimeout) {
		clearTimeout(alarmTimeout);
		alert('Alarm cleared');
	}
}
setTimeout(startClocks, 100);