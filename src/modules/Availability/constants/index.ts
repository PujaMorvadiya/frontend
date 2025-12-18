import { addMinutes } from 'date-fns';

export const checkTimeOverlap = (
  sessionArray: { start_time: string; end_time: string }[]
) => {
  const overlappingIndexes: Array<Array<number>> = [];

  for (let i = 0; i < sessionArray.length; i++) {
    for (let j = i + 1; j < sessionArray.length; j++) {
      if (
        sessionArray?.[i]?.start_time &&
        sessionArray?.[i]?.end_time &&
        sessionArray?.[j]?.start_time &&
        sessionArray?.[j]?.end_time
      ) {
        const start1 = convertToTimeOnly(sessionArray[i].start_time);
        const end1 = convertToTimeOnly(sessionArray[i].end_time);
        const start2 = convertToTimeOnly(sessionArray[j].start_time);
        const end2 = convertToTimeOnly(sessionArray[j].end_time);

        if (
          start1 < end2 && 
          start2 < end1 
        ) {
          overlappingIndexes.push([i, j]);
        }
      }
    }
  }
  return overlappingIndexes;
};

const convertToTimeOnly = (dateString: string) => {
  const date = new Date(dateString);
  return date.getHours() * 60 + date.getMinutes(); 
};

export const generateTimeSlots = (start: Date, end: Date, interval = 15) => {
  const slots = [];
  let currentTime = start;
  let endTimeAdded = false;
  while (currentTime < end) {
    slots.push(new Date(currentTime)); 
    currentTime = addMinutes(currentTime, interval);
  }
  if (!endTimeAdded && currentTime >= end) {
    slots.push(new Date(end)); 
    endTimeAdded = true;
  }
  return slots;
};

export const generateDaySlots = () => {
  const slots = [];
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  let currentSlot = new Date(startOfDay);

  while (currentSlot <= endOfDay) {
    slots.push(currentSlot.toISOString());
    currentSlot = new Date(currentSlot.getTime() + 15 * 60 * 1000);
  }

  return slots;
};
