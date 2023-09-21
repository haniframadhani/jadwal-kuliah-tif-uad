const display = document.getElementById('clock');
const kalender = document.querySelector('.date');
const setAlarmButton = document.querySelector('.set-alarm');
const clearAlarmButton = document.querySelector('.clear-alarm');
const audio = new Audio('js-css/alarm/airraidsiren.mp3');
audio.loop = true;
let alarmTime = null;
let alarmTimeout = null;

function tanggalHariIni() {
	let tanggal = new Date();
	let day = tanggal.getDay();
	let date = tanggal.getDate();
	let month = tanggal.getMonth();
	let year = tanggal.getFullYear();
	let hari = '';
	let bulan = '';
	let tanggalFull = '';

	switch (day) {
		case 0:
			hari = 'Minggu,';
			break;
		case 1:
			hari = 'Senin,';
			break;
		case 2:
			hari = 'Selasa,';
			break;
		case 3:
			hari = 'Rabu,';
			break;
		case 4:
			hari = 'Kamis,';
			break;
		case 5:
			hari = 'Jumat,';
			break;
		case 6:
			hari = 'Sabtu,';
			break;
	}

	switch (month) {
		case 0:
			bulan = 'Januari';
			break;
		case 1:
			bulan = 'Februari';
			break;
		case 2:
			bulan = 'Maret';
			break;
		case 3:
			bulan = 'April';
			break;
		case 4:
			bulan = 'Mei';
			break;
		case 5:
			bulan = 'Juni';
			break;
		case 6:
			bulan = 'Juli';
			break;
		case 7:
			bulan = 'Agustus';
			break;
		case 8:
			bulan = 'September';
			break;
		case 9:
			bulan = 'Oktober';
			break;
		case 10:
			bulan = 'November';
			break;
		case 11:
			bulan = 'Desember';
			break;
	}

	tanggalFull = [hari, date, bulan, year];
	tanggalFull = tanggalFull.join(" ");
	kalender.innerHTML = tanggalFull;
}

tanggalHariIni();

setInterval(() => tanggalHariIni(), 1000);

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

setAlarmButton.addEventListener('click', () => {
	if (alarmTime) {
		const current = new Date();
		const timeToAlarm = new Date(alarmTime);

		if (timeToAlarm > current) {
			const timeout = timeToAlarm.getTime() - current.getTime();
			alarmTimeout = setTimeout(() => audio.play(), timeout);
			alert('Alarm set');
		}
	}
});

clearAlarmButton.addEventListener('click', () => {
	audio.pause();
	if (alarmTimeout) {
		clearTimeout(alarmTimeout);
		alert('Alarm cleared');
	}
})

setTimeout(startClocks, 100);