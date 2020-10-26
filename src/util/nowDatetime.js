export function getNowDate() {//当前日期 yyyy-MM-dd
	let date = new Date();
	let seperator1 = "-";
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	let currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

export function getNowMonth() {//当前月份 yyyy-MM
	let date = new Date();
	let seperator1 = "-";
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	let currentdate = year + seperator1 + month;
	return currentdate;
}

export function DateMinus(day) {//当前时间-day yyyy-MM-dd
	let nowdate = new Date();
	let computeDate, computeYear, computeMonth, computeDay;
	if (day !== 30) {
		computeDate = new Date(nowdate - day * 24 * 3600 * 1000);
		computeYear = computeDate.getFullYear();
		computeMonth = computeDate.getMonth() + 1;
		computeDay = computeDate.getDate();
	} else {
		computeYear = nowdate.getFullYear();
		computeMonth = nowdate.getMonth();
		computeDay = nowdate.getDate();
	}
	if (computeMonth >= 1 && computeMonth <= 9) {
		computeMonth = "0" + computeMonth;
	}
	if (computeDay >= 1 && computeDay <= 9) {
		computeDay = "0" + computeDay;
	}

	let currentdate = computeYear + '-' + computeMonth + '-' + computeDay;
	return currentdate;
}

export function getMonthMinus(data) {//当前月份-data yyyy-MM
	let nowdate = new Date();
	let computeDate, computeYear, computeMonth, computeDay;
		computeDate = new Date(nowdate - data * 24 * 3600 * 1000*30);
		computeYear = computeDate.getFullYear();
		computeMonth = computeDate.getMonth() + 1;
	if (computeMonth >= 1 && computeMonth <= 9) {
		computeMonth = "0" + computeMonth;
	}

	let currentdate = computeYear + '-' + computeMonth ;
	return currentdate;
}

export function getNowFormatDate() {//当前时间 yyyy-MM-dd HH:MM:SS
	let date = new Date();
	let seperator1 = "-";
	let seperator2 = ":";
	let month = date.getMonth() + 1;
	let strDate = date.getDate();
	let hour=date.getHours();
	let minutes=date.getMinutes();
  let seconds =date.getSeconds();

  if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if (seconds >= 0 && seconds <= 9) {
		seconds = "0" + seconds;
	}
	if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
	}
	if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
	}

	let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		+ " " + hour + seperator2 + minutes
		+ seperator2 + seconds;
	return currentdate;
}

// 获取近day天
export function getNearDay(day) {
    var today = new Date();
    var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
    today.setTime(targetday_milliseconds); // 注意，这行是关键代码
    var tYear = today.getFullYear();
    var tMonth = today.getMonth();
    var tDate = today.getDate();
    tMonth = doHandleMonth(tMonth + 1);
    tDate = doHandleMonth(tDate);
    return tYear + "-" + tMonth + "-" + tDate;
}
export function doHandleMonth(month) {
    var m = month;
    if (month.toString().length == 1) {
        m = "0" + month;
    }
    return m;
}
export function dayToWeek(date) {//格式为 2016-8-10
  let array= new Array();
  array=date.split('-');
  let ndate=new Date(array[0],parseInt(array[1]-1),array[2]);
  let weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  let weekDay = weekArray[ndate.getDay()];
    return weekDay;
}

export default {getNowDate, getNowMonth, DateMinus, getNowFormatDate, getMonthMinus, getNearDay, doHandleMonth,dayToWeek}
