export const roundToNearest15 = (date: Date): Date => {
  const ms = 1000 * 60 * 15;
  const time = date?.getTime();
  if (time % ms < 60000) {
    return date;
  }
  return date && new Date(Math.ceil(date.getTime() / ms) * ms);
};