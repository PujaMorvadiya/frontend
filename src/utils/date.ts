import { set } from "date-fns";

export const roundToNearest15 = (date: Date): Date => {
  const ms = 1000 * 60 * 15;
  const time = date?.getTime();
  if (time % ms < 60000) {
    return date;
  }
  return date && new Date(Math.ceil(date.getTime() / ms) * ms);
};

export const mergeDateAndTime = (date: Date, time: Date): string => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const combinedDateTime = set(date, { hours, minutes, seconds });

  return combinedDateTime.toISOString();
};