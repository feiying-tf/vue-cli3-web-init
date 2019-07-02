/*
  转换规则：
  1. 一分钟内显示刚刚
  2. 1个小时内小时 XXX分钟前
  3. 1个小时外的24小时内，显示XXX小时前
  4. 24小时以上一个月以内，显示xxx天前
  5. 大于30天，显示MM月dd日
  6. 跨年 显示yyyy年mm月
  7. 其余显示 2016-10-15
*/

export function formatTime (time:string) {
  let oldTime = new Date(time).getTime();
  let currentTime = new Date().getTime();
  let diff = currentTime - oldTime;
  const HOUR = 3600; // 一个小时对应的秒数
  const DAY = HOUR * 24; // 24小时以内
  const MONTH = DAY * 30; // 30天以内
  const YEAR = MONTH * 12; // 12个月以内

  let second = Math.floor(diff / 1000); // 相差的秒数
  if (second < 60) {
    return '刚刚'
  } else if (second < HOUR) {
    return `${Math.floor(second / 60)}分钟前`
  } else if (second < DAY) {
    return `${Math.floor(second / HOUR)}小时前`
  } else if (second < MONTH) {
    return `${Math.floor(second / DAY)}天前`
  } else if (second < YEAR) {
    let month = new Date(time).getMonth() + 1;
    let day = new Date(time).getDate();
    return `${month}月${day}日`
  } else {
    let year = new Date(time).getFullYear();
    let month = new Date(time).getMonth() + 1;
    let date = new Date(time).getDate();
    return `${year}-${month}-${date}`
  }
}