import { endOfDay, isSameDay, parseISO, startOfDay } from 'date-fns';

export function generateUniqueKey() {
  return `key-${Math.random()}`;
}

export function filterTimeSlots(
  eventStartDate: Date,
  startDate: string,
  endDate: string
) {
  const startOfEventDay = startOfDay(eventStartDate);
  const endOfEventDay = endOfDay(eventStartDate);


  const slotStart = startDate && parseISO(startDate);
  const slotEnd = endDate && parseISO(endDate);
  return (
    isSameDay(slotStart as Date, startOfEventDay) &&
    isSameDay(slotEnd as Date, endOfEventDay)
  );
}
