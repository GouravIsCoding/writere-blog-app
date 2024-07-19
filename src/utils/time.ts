import moment from "moment";

export const giveTime = (date: string) => {
  const time = moment(date).fromNow();
  return time;
};
