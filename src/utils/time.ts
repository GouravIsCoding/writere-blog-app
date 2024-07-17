const monthArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const giveTime = (date: string) => {
  const time = new Date(date);

  return `${time.getDate()} ${
    monthArr[time.getMonth()]
  } ${time.getFullYear()}\n${String(time.getHours()).padStart(2, "0")}:${String(
    time.getMinutes()
  ).padStart(2, "0")} `;
};
