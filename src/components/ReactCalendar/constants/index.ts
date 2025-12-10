import { endOfDay, isSameDay, parseISO, startOfDay } from 'date-fns';

export function generateUniqueKey() {
  return `key-${Math.random()}`;
}

export function filterTimeSlots(
  eventStartDate: Date,
  startDate: string,
  endDate: string
) {
  // Get the start and end of the event day
  const startOfEventDay = startOfDay(eventStartDate);
  const endOfEventDay = endOfDay(eventStartDate);

  // Filter time slots that are on the same day as the event

  const slotStart = startDate && parseISO(startDate);
  const slotEnd = endDate && parseISO(endDate);
  // Check if both the start and end times are on the same day as the event's start date
  return (
    isSameDay(slotStart as Date, startOfEventDay) &&
    isSameDay(slotEnd as Date, endOfEventDay)
  );
}
