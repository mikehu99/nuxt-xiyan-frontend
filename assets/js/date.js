import dayjs from "dayjs"

export function showtime(time) {
  time = dayjs(time).format("YYYY/MM/DD HH:MM:ss");
  let date =
    typeof time === "number"
      ? new Date(time)
      : new Date((time || "").replace(/-/g, "/"));
  let diff = (new Date().getTime() - date.getTime()) / 1000;
  let dayDiff = Math.floor(diff / 86400);

  let isValidDate =
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date.getTime());

  if (!isValidDate) {
    window.console.error("不是有效日期格式");
  }
  const formatDate = function(date) {
    let today = new Date(date);
    let year = today.getFullYear();
    let now = new Date();
    let thisYear = now.getFullYear();

    let month = today.getMonth() + 1;
    let day = today.getDate();
    if (thisYear === year) {
      return `${month}月${day}日`;
    }
    return `${year}年${month}月${day}日`;
  };

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return formatDate(date);
  }
  return (
    (dayDiff === 0 &&
      ((diff < 60 && "刚刚") ||
        (diff < 120 && "1分钟") ||
        (diff < 3600 && Math.floor(diff / 60) + "分钟") ||
        (diff < 7200 && "1小时") ||
        (diff < 86400 && Math.floor(diff / 3600) + "小时"))) ||
    (dayDiff === 1 && "昨天") ||
    (dayDiff < 7 && dayDiff + "天") ||
    (dayDiff < 31 && Math.ceil(dayDiff / 7) + "周")
  );
}
export function timeago(value) {
  var year = 24 * 60 * 60 * 1000 * 365;
  var month = 24 * 60 * 60 * 1000 * 30;
  var day = 24 * 60 * 60 * 1000;
  var hour = 60 * 60 * 1000;
  var minute = 60 * 1000;

  var newDate = new Date().getTime();
  var time = new Date(value).getTime();
  var date = newDate - time;

  var years =
    parseInt(date / year) > 0 ? `${parseInt(date / year)}年` : "";
  var months =
    parseInt(date / month) > 0 ? `${parseInt(date / month)}月` : "";
  var days = parseInt(date / day) > 0 ? `${parseInt(date / day)}天` : "";
  var hours =
    parseInt(date / hour) > 0 ? `${parseInt(date / hour)}小时` : "";
  var minutes =
    parseInt(date / minute) > 0 ? `${parseInt(date / minute)}分钟` : "";

  if (years.length != 0) {
    return years;
  } else if (months.length != 0) {
    return months;
  } else if (days.length != 0) {
    return days;
  } else if (hours.length != 0) {
    return hours;
  } else if (minutes.length != 0) {
    return minutes;
  } else {
    return parseInt(date / 1000) > 0 ? `${parseInt(date / 1000)}秒` : "";
  }
}
